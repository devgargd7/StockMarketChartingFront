import { Company } from "./Company";
import { StockExchange } from "./StockExchange";

export interface CompanyStockExchangeMap{
    id:Number;
	companyCode:String;
	company?:any;
	stockExchange:StockExchange;
}