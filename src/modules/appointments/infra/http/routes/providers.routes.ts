import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthentication';
import { Router } from 'express';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();
const dayAvailabilityController = new DayAvailabilityController();
const monthAvailabilityController = new MonthAvailabilityController();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  monthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  dayAvailabilityController.index,
);

export default providersRouter;
