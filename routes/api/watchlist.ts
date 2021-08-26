import { Request, Response } from 'express';
import WatchList from '../../dao/watchlistDao';

const watchListDao =new WatchList();

/**
 * api route that calls function to get all profiles but only shows emails
 * @param req 
 * @param res 
 */
export async function getAllWatchList(req: Request, res: Response){
  try {
    const watchlist = await watchListDao.getAllWatchList();
    res.status(200).json(watchlist);
  } catch(error){
    console.error(error);
    res.status(500).json({err:"something went wrong"})
  }
} 

// /**
//  * api route that calls function to get profile by handle
//  * if not found will return custom response 
//  * @param req 
//  * @param res 
//  */
// export async function getByHandle(req: Request, res: Response){
//   try {
//     const { handle } = req.params
//     const profile = await profileDao.getProfileByHandle(handle)
//     profile !== undefined ? res.status(200).json(profile) : res.json(`${handle} does not exist`);
//   } catch(error){
//     res.status(500).json({err:"something went wrong"})
//   }
// }

// /**
//  * api route that calls function to add or update existing profile
//  * will check for age validation 
//  * @param req 
//  * @param res 
//  * @returns 
//  */
// export async function addOrUpdateProfile(req: Request, res: Response){
//   try {
//     const {age} = req.body;
//     if (Number(age) < 13){
//       return res.json("You must be 13 years of age to join FakeBook. Sorry");
//     }
//     const user = await profileDao.addOrUpdateProfile(req.body)
//     res.status(200).json("You were successful!")
//     res.status(200).json(user);
//   } catch(error){
//     res.status(500).json({err:"something went wrong"})
//   }
// }

// /**
//  * api route that calls function to delete profile
//  * by handle from the database
//  * @param req 
//  * @param res 
//  */
// export async function deleteProfileByHandle(req: Request, res: Response){
//   try {
//     const { handle } = req.params
//     const profile = await profileDao.deleteProfileByHandle(handle);
//     res.status(200).json(`${handle}'s profile was successfully deleted`);
//     res.status(200).json(profile);
//   } catch(error){
//     res.status(500).json({err:"something went wrong"})
//   }
// }