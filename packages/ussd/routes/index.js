import { Router } from 'express';
import { USSDFlowController } from '../src/Controller';

const router = Router();
const ussd = new USSDFlowController();

/* GET home page. */
router
  .route('/')
  .post(ussd.entryPoint)
  .get(ussd.entryPoint);

export default (app) => {
  app.use('/ussd', router);
};
