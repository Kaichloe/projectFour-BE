import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, DeleteItemCommand} from '@aws-sdk/client-dynamodb';
import IWatchList from '../models/watchlist';

const REGION:string = "us-east-1";
const dynamoClient = new DynamoDBClient({region: REGION})
const TABLE_NAME:string = "WatchList";

export interface IWatchListDao {
  getAllWatchList: () => Promise<IWatchList[]>;
  // addToWatchList: (stock:IWatchList) => Promise<void>;
  // deleteWatchList: (stock:IWatchList) => Promise<void>;
}

class WatchListDao implements IWatchListDao{
  public async getAllWatchList():Promise<IWatchList[]> {
    const params = {
      TableName: TABLE_NAME
    };

    const watchList = await dynamoClient.send(new ScanCommand(params));
    let all = [];
    console.log(watchList)
    for(const values of watchList.Items){
      all.push([values.ticker.S, values.companyName.S]);
    }

    return all as IWatchList[];
  }

  public async add(user:IProfile):Promise<void> {
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