
// Company Code – to which Company this Stock Price Info belongs to
// 2. Stock Exchange – the Stock Price of the Company in this Stock Exchange
// 3. Current Price – Stock Price
// 4. Date – Date of the Stock Price
// 5. Time – Stock Price at this Specific time

import { Time } from "@angular/common";
import { Company } from "./Company";
import { StockExchange } from "./StockExchange";

export interface StockPrice{
    company: Company;
    stockExchange: StockExchange;
    currentPrice:Number;
    date: Date;
    time:Time;
}