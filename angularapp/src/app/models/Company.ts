import { CompanyStockExchangeMap } from "./CompanyStockExchangeMap";
import { Sector } from "./Sector";
import { StockExchange } from "./StockExchange";

export interface Company{
    id?:Number;
    companyName: string;
    turnover?: number;
    ceo?: string;
    boardOfDirectors?: string[];
    stockExchanges?: String[];
    stockCodes?:CompanyStockExchangeMap[];
    sector?: Sector;
    brief?: string;
}
/*
2. Turnover
3. CEO
4. Board of Directors
5. Listed in Stock Exchanges
6. Sector
7. Brief writeup, about companies Services/Product, etc…
8. Stock code in each Stock Exchange
 */