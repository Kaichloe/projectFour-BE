import {Router} from 'express';
import {getAllWatchList} from './watchlist';

//Watchlist-route
const watchListRouter = Router();
watchListRouter.get('/', getAllWatchList);
// watchListRouter.post('/',addOrUpdatewatchList);
// watchListRouter.delete('/:handle', deleteProfileByHandle);


//Root-router
const rootRouter = Router();
rootRouter.use('/watchlist', watchListRouter);

export default rootRouter;