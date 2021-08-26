//Defining WatchList interface 
export interface IWatchList {
  ticker: string;
  companyName: string;
}

class WatchList implements IWatchList {
  constructor(
    public ticker: string,
    public companyName: string
  ){}
}

export default WatchList;