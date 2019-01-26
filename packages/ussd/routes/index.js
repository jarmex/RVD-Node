import { Router } from 'express';
import { USSDFlowControl } from '../src/Controller';

const router = Router();
const ussd = new USSDFlowControl();

/* GET home page. */
router
  .route('/')
  .post(ussd.entryPoint)
  .get(ussd.entryPoint);

export default (app) => {
  app.use('/ussd', router);
};
