# RVD-Node

USSD over SMPP or USSD over HTTP(s) implementation. 

## Introduction

This application is the implementation of  
1. USSD over SMPP
2. USSD over HTTPS

The Restcomm RVD should be used to design the USSD menu or text. You can read more about Restcomm RVD from this link [Restcomm Visual Designer](https://www.restcomm.com/docs/connect/rvd/Quick%20Start%20Guide.html).

NOTE: The application does not work with the cloud version of Restcomm RVD. 

Installation
------------
The packages folder contains either the http version or the smpp version. For either version, you will need to setup the environment variables. Note the following prefix when setting the environment variables.

* SMSC_ indicate all variables will be assigned for the SMPP bind (e.g. SMSC_IP correspond to the SMSC IP address, SMSC_SYSTEM_ID indicate the system_id...)
* SUBMITSM_ indicate all variables will be included in the submit_sm (e.g. SUBMITSM_DATA_CODING indicate the data_coding value for the submit_sm)
* REDIS_ indicate the parameters to connect to the Redis database

The following environment variables needs to be set: 
DB_HOST
DB_USER
DB_PASSWORD
DB_TRANSACTION_NAME
RESTCOMM_WORKSPACE_DIR
USSD_SESSION_TIMEOUT
USSD_SAVE_TRANSACTION (acceptable values are ALL, NONE, END, UPDATE)

You need to have MySQL database running and configure the corresponding environment variables.


More to be added ....

Roadmap
-------
* More test coverage.

License
-------
RVD-Node is released under the MIT license.