/* eslint-disable func-names */
import smpp from 'smpp';
import procDeliverSm from './deliversm';

import { logger, UssdServiceOp } from '../utils';

const { printerror, debug } = logger().getContext('ussd');

class UssdOverSmpp {
  constructor(params = {}) {
    this.url = `smpp://${params.ipaddress}:${params.port}`;
    this.session = null;
    this.isNetworkConneted = false;
    this.options = params;
    this.smscConnected = false;
    this.maxEnquireLink = params.maxenquirelink || 5;
    this.enqireCounter = 0;
    this.reconnectCounter = 0;
    this.timeout = (params.enquirelink || 30) * 1000;
    // addTLV('its_session_info', { id: 0x1383, type: types.tlv.int32 });
    // console.log(types);
  }

  startSession = () => {
    if (!this.session) {
      debug('connecting to the smsc .......');
      debug(`SMSC IP: ${this.options.ipaddress}, PORT: ${this.options.port}`);
      this.session = smpp.connect(this.url);
    }
    // listen for error from the network stream
    this.session.on('error', this.onErrorMsg);
    // listen for timeout events
    this.session.on('timeout', () => {
      debug('Connection to SMSC timed out. Closing connection');
      try {
        this.unBind();
        this.session.close();
      } catch (error) {
        debug(error.message);
      }
    });

    // listen for close events
    this.session.on('close', () => {
      debug('close event fired');
      this.smscConnected = false;
      this.isNetworkConneted = false;
    });

    this.session.on('connect', () => {
      // reconnect if there is socket close.
      this.session.socket.on('close', this.reConnect);

      debug('connection established. Setting up event listeners');
      this.isNetworkConneted = true;
      this.session.on('deliver_sm', this.onReceiveMessage);
      this.session.on('unbind', this.onEndbind);
      // respond to enquire link from the provider
      this.session.on('enquire_link', (pdu) => {
        this.session.send(pdu.response());
        debug('Responded to enquire link');
      });
      this.session.on('enquire_link_resp', () => {
        this.enqireCounter = 0;
        debug('Received a response to an enquire link');
      });
      // when close request received
      debug('setting up event listeners completed.');
      // start a sesssion here
      debug('bind to the SMSC');
      this.startBind();
    });
  };

  reConnect = () => {
    printerror('Socket connection closed. Re-connecting again');

    setTimeout(() => {
      this.session.connect();
      this.session.resume();
    }, this.timeout);
  };

  sendEnquireLink = () => {
    if (this.enqireCounter < this.maxEnquireLink) {
      this.session.enquire_link();
      this.enqireCounter = this.enqireCounter + 1;
      debug('Enquire a link');
      setTimeout(() => {
        this.sendEnquireLink();
      }, this.timeout);
    } else {
      printerror('The SMPP connection is dead.');
      this.session.close();
      process.exit();
    }
  };

  /**
   * Start a bind request to the SMSC
   */
  startBind = () => {
    // bind to the smsc and set the session
    if (!this.isNetworkConneted) {
      debug('No connection established.');
      // throw new Error('No connection established.');
      return;
    }
    if (!this.options.bind || typeof this.options.bind !== 'object') {
      // throw new Error('No binding parameters');
      debug('No binding parameters');
      return;
    }
    debug('sending binding request to the SMSC');
    this.session.bind_transceiver(this.options.bind, async (pdu) => {
      debug('Bind Response:');
      debug(pdu);
      const cmdStatus = pdu.command_status;

      if (cmdStatus === smpp.errors.ESME_ROK) {
        this.smscConnected = true;

        // connection established. Start the enquirelink
        debug(`starting enquire link with intervals: ${this.timeout}`);
        this.sendEnquireLink();
      } else {
        printerror(`SMPP bind transceiver error: ${pdu.command_status}`);
        this.session.close();
        process.exit(1);
      }
    });
  };

  /**
   * Send a Message to a receipient
   * @param {String} sender sender number
   * @param {String} recipient the destination number
   * @param {String} message The short message to the destination number
   */
  sendMessage = (sendparam) => {
    // send the message if session is established
    if (!this.smscConnected) {
      // throw new Error('No connection to the SMSC');
      debug('No connection to the SMSC');
      return;
    }
    // if there is not message to be sent exit.
    if (!sendparam.message) {
      printerror('failed to send the message. Message undefined or null');
      printerror('%o', sendparam);
      return;
    }

    const msg = {
      short_message: sendparam.message,
      source_addr: sendparam.from,
      destination_addr: sendparam.msisdn,
      data_coding: 0x0f,
      its_session_info: Buffer.from(`${sendparam.its_session_info || 0}`, 'hex'),
      ...this.options.submitSm,
    };

    // check the ussd_service_op type
    if (sendparam.ussdserviceop) {
      msg.ussd_service_op = sendparam.ussdserviceop; // USSN Request
    } else {
      const serviceOp = UssdServiceOp(sendparam.pushtype);
      msg.ussd_service_op = serviceOp;
    }

    debug('sending message to the SMSC');

    debug('%o', msg);
    this.session.submit_sm(msg, (pdu) => {
      debug('%o', pdu);
    });
  };

  onReceiveMessage = (pdu) => {
    // send delivery response
    this.session.send(pdu.response());
    debug(
      `[Deliver_sm]:
      Source_Addr=${pdu.source_addr}, 
      Destination_Addr=${pdu.destination_addr},
      Message=${pdu.short_message.message}`,
    );
    // check for the ussd_service_op for new request or continous transaction
    // • For new request of a subscriber is PSSR REQUEST.
    // • For continuous request is USSR RESPONSE.

    setImmediate(async () => {
      // process the message asynchronously
      debug('%o', pdu);
      const response = await procDeliverSm(pdu);
      if (response) {
        this.sendMessage(response);
      }
    });
  };

  unBind = () => {
    if (!this.isNetworkConneted) {
      debug('No connection established.');
      // throw new Error('No connection established.');
      return;
    }
    debug('sending unbind request to close connection');
    this.session.unbind((pdu) => {
      debug('%o', pdu);
      debug('closing network connection');
      this.session.close();
    });
  };

  onEndbind = (pdu) => {
    this.smscConnected = false;
    this.session.send(pdu.response());
    this.session.close();
  };

  // handle errors
  onErrorMsg = (pdu) => {
    debug('ERROR:');
    debug('%o', pdu);
    if (pdu.code === 'ECONNREFUSED') {
      if (this.reconnectCounter < this.maxEnquireLink) {
        this.reconnectCounter = this.reconnectCounter + 1;
        debug(`Failed to connect to SMPP server. Message: ${pdu.message}`);
        // TODO: try to re-establish connect to the SMSC
        if (!this.session) {
          // trying to re-establish connection again
          debug('re-establishing network connection');
          this.session.connect();
          // TODO: unlink any events here
        }
      } else {
        printerror('Failed to connect. Existing application');
        process.exit(1);
      }
    } else {
      debug(`Error Code: ${pdu.code}, Message: ${pdu.message}`); // e.g. ECONNREFUSED
    }
    // this.session.close();
  };
}

// eslint-disable-next-line
export { UssdOverSmpp };
