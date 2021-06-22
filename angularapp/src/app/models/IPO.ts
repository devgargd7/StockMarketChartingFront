import { Company } from "./Company";
import { StockExchange } from "./StockExchange";

export interface IPO{
    company: Company;
    stockExchanges?: StockExchange[];
    pricePerShare:Number;
    totalNumberOfShare:Number;
    openDateTime:String;
    remarks:String;
}


/*1. id
2. Company Name
3. Stock Exchange
4. Price per share
5. Total number of Shares
6. Open Date Time
7. Remarks*/