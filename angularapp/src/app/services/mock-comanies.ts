import { Company } from '../models/Company';
import { Sector } from '../models/Sector';
import { StockExchange } from '../models/StockExchange';

export const sectors: Sector[]=[{
  sectorName: "Finance",
    brief:"finance"
  },
  {
    sectorName: "Technology",
    brief:"technology"
  },{
    sectorName: "HealthCare",
    brief:"health care services"
  },{
    sectorName: "Pharmaceuticals",
    brief:"pharma"
  }
  ]    

  export const stockExchanges: StockExchange[]=[{
    stockExchangeName:"BSE",
    brief: "Bombay Stock Exchange",
    contactAddress: "Mumbai, Maharashtra",
    remarks: "older"
  },
  {
    stockExchangeName:"NSE",
    brief: "National Stock Exchange",
    contactAddress: "Delhi",
    remarks: "Newer"
  }
  ]    


export const Companies: Company[]=[{
    companyName: "Apple",
    turnover: 100000000,
    ceo: "Tim Cook",
    boardOfDirectors:["Steve Jobs", "Tim Cook"],
    // stockExchanges: [stockExchanges[0], stockExchanges[1]],
    sector: sectors[1],
    brief:"trillion dollar comapny"
  },
  {
    companyName: "Microsoft",
    turnover: 50000000,
    ceo: "Satya Nadela",
    boardOfDirectors:["Satya Nadela", "Bill Gates"],
    // stockExchanges:[stockExchanges[0]],
    sector: sectors[1],
    brief:"company behind Windows"
  }
  ]    