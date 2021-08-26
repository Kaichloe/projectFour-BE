import {Router} from 'express';

//Watchlist-route
const watchListRouter = Router();
watchListRouter.get('/', getAllwatchLists);
watchListRouter.post('/',addOrUpdatewatchList);
watchListRouter.delete('/:handle', deleteProfileByHandle);


//Root-router
const rootRouter = Router();
rootRouter.use('/watchlist', watchListRouter);

export default rootRouter;