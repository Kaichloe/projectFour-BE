import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, DeleteItemCommand} from '@aws-sdk/client-dynamodb';
import IWatchList from '../models/watchlist';

const REGION:string = "us-east-1";
const dynamoClient = new DynamoDBClient({region: REGION})
const TABLE_NAME:string = "WatchList";

export interface IWatchListDao {
  getAllWatchlist: () => Promise<IWatchList[]>;
  addToWatchList: (stock:IWatchList) => Promise<void>;
  deleteWatchList: (stock:IWatchList) => Promise<void>;
}

class WatchListDao implements IProfileDao{
  public async getProfiles():Promise<IProfile[]> {
    const params = {
      TableName: TABLE_NAME
    };

    const profiles = await dynamoClient.send(new ScanCommand(params));
    let filteredProfiles = [];

    for(const values of profiles.Items){
      filteredProfiles.push(values.email.S);
    }

    return filteredProfiles as Profile[];
  }

  /**
   * Will add or update profile based on given params. Will make sure handle is all lowerCased
   * @param user 
   */
  public async addOrUpdateProfile(user:IProfile):Promise<void> {
    const {handle, age, email} = user;
    const lowerCase = handle.toLowerCase();

    const body = {
      TableName: TABLE_NAME,
      Item: {
        handle: {S: lowerCase},  
        age: {N: age},
        email: {S: email}
      } 
    }
    await dynamoClient.send(new PutItemCommand(body));
  }

  /**
   * Will get profile based on handle. Will show handle, email and age
   * @param handle 
   * @returns 
   */
  public async getProfileByHandle(handle:string):Promise<IProfile | null > {
    const lowerCase = handle.toLowerCase();
    const params = {
      TableName: TABLE_NAME,
      Key: {
        handle: {S: lowerCase}
      }
    }
    const profile = await dynamoClient.send(new GetItemCommand(params));
    return profile.Item as Profile;
  }

  /**
   * will delete profile by handle 
   * from the database
   * @param handle 
   */
  public async deleteProfileByHandle(handle:string):Promise<void> {
    const toLower = handle.toLowerCase();
    const params = {
    TableName: TABLE_NAME,
      Key: {
        handle: {S: toLower},
      }
    }
    await dynamoClient.send(new DeleteItemCommand(params));
  }
}

export default WatchListDao;