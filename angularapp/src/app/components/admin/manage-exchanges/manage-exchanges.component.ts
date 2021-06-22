import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { StockExchange } from 'src/app/models/StockExchange';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-exchanges',
  templateUrl: './manage-exchanges.component.html',
  styleUrls: ['./manage-exchanges.component.css']
})
export class ManageExchangesComponent implements OnInit {

  ExchangeList: StockExchange[];
  showExchangeForm=false;
  page=1;
  pageSize=10;
  searchExchange:string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addExchange(){
    this.showExchangeForm=!this.showExchangeForm;
  }

  getAllexchanges(){
    this.http.get(`${environment.StockExchangeServiceApiUrl}/admin/stockexchanges`).subscribe(
      (response) => {
        console.log(response);
        this.ExchangeList=<StockExchange[]>response;
      },
      (error) => console.log(error)
    )
  }

  search(){
    if(this.searchExchange && this.searchExchange.length>2)
    this.getExchangesMatching(this.searchExchange);
  }

  getExchangesMatching(pattern:string):void{
    // if(this.CompanyList && this.CompanyList.length) return this.CompanyList;
    debounceTime(200),
    this.http.get(`${environment.StockExchangeServiceApiUrl}/admin/stockexchanges/`+pattern).subscribe(
      (response) => {
        console.log(response);
        this.ExchangeList=<StockExchange[]>response;
      },
      (error) => console.log(error)
    )
  
  }

  deleteExchange(exchange:StockExchange){
    // console.log(exchange.id);
    this.http.delete(`${environment.StockExchangeServiceApiUrl}/admin/stockexchanges/delete/`+exchange.id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    )
  }

}
