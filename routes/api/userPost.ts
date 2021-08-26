import UserPostDao from '../../dao/userPostDao';
import { Request, Response } from 'express';

const userPostDao = new UserPostDao();

/**
 * api route that calls function that
 * returns post by handle 
 * if there is not post found by handle will return custom comment
 * @param req 
 * @param res 
 */
export async function getPostsByHandle(req: Request, res: Response){
  try {
    const {handle} = req.params;
    const post = await userPostDao.getPostsByHandle(handle);
    post !== undefined ? res.status(200).json(post) : res.status(200).json("There are no post for that handle");
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

/**
 * api route that calls function
 * that will add more to your post 
 * @param req 
 * @param res 
 */
export async function addPost(req: Request, res: Response){
  try {
    const post = await userPostDao.addPost(req.body)
    res.status(200).json("You were successful in adding the post!")
    res.status(200).json(post);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

/**
 * api route that calls function 
 * that will create a new post 
 * @param req 
 * @param res 
 */
export async function newPost(req: Request, res: Response){
  try {
    const post = await userPostDao.newPost(req.body)
    res.status(200).json("You were successful in creating a new post!")
    res.status(200).json(post);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

/**
 * api route that calls function 
 * that will delete post based on handle
 * @param req 
 * @param res 
 */
export async function deleteAllPostByHandle(req: Request, res: Response){
  try {
    const {handle} = req.params;
    const post = await userPostDao.deleteAllPostByHandle(handle)
    res.status(200).json(`All of ${handle}'s posts were successfully deleted`);
    res.status(200).json(post);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}









