import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/Company';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {FormControl} from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StockExchange } from 'src/app/models/StockExchange';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectOption } from '@angular/forms';
import { Sector } from 'src/app/models/Sector';
import { StockPrice } from 'src/app/models/StockPrice';
@Component({
  selector: 'app-compare-form',
  templateUrl: './compare-form.component.html',
  styleUrls: ['./compare-form.component.css']
})
export class CompareFormComponent implements OnInit {

  @Input("compareType") compareType='company';
  @Input("setPeriod") periodFix={
    fixed: false,
    fromDate:"",
    toDate:"",
    periodicity:""
  };
  @Output() successSubmission = new EventEmitter();
  @Output() successSubmissionPeriodFix = new EventEmitter();

  companyList: Company[];
  stockExchangeList: StockExchange[]=[];
  sectorList: Sector[];
  // searchCompany: string;
  form:FormGroup;
  date: NgbDateStruct;
  selectedCompany:Company;
  periodicity='hourly';

  constructor(private http: HttpClient,
    private fb:FormBuilder) {
     }

  ngOnInit(): void {
    if(this.compareType=='company'){
      this.form = this.fb.group({
        company:[],
        stockExchange:[''],
        fromDate:[''],
        toDate:['']
      });

      this.form.get("company").valueChanges.subscribe(x => {
        // console.log(x);
        this.getCompaniesMatching(x);
     });

    }
    else if(this.compareType=='sector'){
      this.form = this.fb.group({
        sector:[''],
        fromDate:[''],
        toDate:['']
      });
    }

    //set Period
    if(this.periodFix.fixed){
      this.form.get('fromDate').setValue(this.periodFix.fromDate); 
      this.form.get('toDate').setValue(this.periodFix.toDate); 
      this.periodicity = this.periodFix.periodicity; 
    }
  }



  getCompaniesMatching(pattern:string){
    // debounceTime(200),
    this.http.get(`${environment.CompanyServiceApiUrl}/user/companies/`+pattern).subscribe(
      (response) => {
        // console.log(response);
        this.companyList=(<Company[]>response).slice(0,10);
        if(this.companyList && this.companyList.length){
          this.selectedCompany = this.companyList[0];
          this.getStockExchanges();
        }
      },
      (error) => console.log(error)
    )
  }

  getStockExchanges(){
    this.stockExchangeList = this.selectedCompany.stockCodes.map( (sc)=> sc.stockExchange );
    this.form.get('stockExchange').setValue(this.stockExchangeList[0]);
  }

  getSectorMatching(pattern:string){
    // debounceTime(200),
    this.http.get(`${environment.CompanyServiceApiUrl}/user/sector/`+pattern).subscribe(
      (response) => {
        console.log(response);
        this.companyList=(<Company[]>response).slice(0,10);
        this.selectedCompany = this.companyList[0];
        this.getStockExchanges();
      },
      (error) => console.log(error)
    )
  }


  onSubmit(e:Event){
    e.preventDefault;
    if(this.compareType=='company'){
      let labels = this.getLabels(this.form.value.fromDate, this.form.value.toDate);
      let requestBody = this.form.value;
      requestBody.toDate =  this.formatDate(requestBody.toDate);
      requestBody.fromDate =  this.formatDate(requestBody.fromDate);
      // console.log(requestBody);
      this.http.post(`${environment.CompanyServiceApiUrl}/user/companies/stockprice`,requestBody).subscribe(
      (response) => {
        console.log(response);
        let series = this.getSeries(response, this.form.value['company']);  

        var dataset = [{
          "seriesname": series[0].seriesname,
          "data": [  ] = labels[0].category.map( (label)=> ({
            value: 
              series[0].data.filter( (d:any)=>{if(d.label == label.label) return d.value;}).length ?  series[0].data.filter( (d:any)=>{if(d.label == label.label) return d.value;})[0].value : null
              
          }) )
        }]
        this.periodFix.fixed=true;
        this.periodFix.fromDate=this.form.get('fromDate').value;
        this.periodFix.toDate=this.form.get('toDate').value;
        this.periodFix.periodicity= this.periodicity;
        console.log("final dataset",dataset);
        this.successSubmission.emit({dataset:dataset[0], categories:labels});
        this.successSubmissionPeriodFix.emit(this.periodFix);
        // this.successSubmission.emit(<any[]>response);
      },
      (error) => console.log(error)
    )}
    else if(this.compareType == 'sector'){

    }
  }


  getLabels(fromDate:any,toDate:any){
    var categories= [
      {
        "category": [{"label":""}]
      }
    ]
    if(this.periodicity == 'hourly'){
      for(let y=fromDate.year;y<=toDate.year;y=y+1){
        for(let m=fromDate.month;m<=toDate.month;m=m+1){
          for(let d=fromDate.day;d<=toDate.day;d=d+1){
            for(let h=0;h<24;h=h+1){
                // console.log(y+' '+m+' '+d+' '+h);
               categories[0].category.push({"label": (new Date(y,m,d,h)).toISOString()});
            }
          }
        } 
      }
    }

    else if(this.periodicity == 'daily'){
      for(let y=fromDate.year;y<=toDate.year;y=y+1){
        for(let m=fromDate.month;m<=toDate.month;m=m+1){
          for(let d=fromDate.day;d<=toDate.day;d=d+1){
            categories[0].category.push({"label": (new Date(y,m,d)).toISOString()});
          }
        } 
      }
    }

    else if(this.periodicity == 'monthly'){
      for(let y=fromDate.year;y<=toDate.year;y=y+1){
        for(let m=fromDate.month;m<=toDate.month;m=m+1){
          categories[0].category.push({"label": (new Date(y,m)).toISOString()});
        } 
      }
    }
    else if(this.periodicity == 'yearly'){
      for(let y=fromDate.year;y<=toDate.year;y=y+1){
        categories[0].category.push({"label": (new Date(y)).toISOString()});
      }
    }

    console.log("getlabels categories:",categories);
    return categories;
  }

  getSeries(response:any, seriesname:string){
  var dataset = [{
      "seriesname": seriesname,
      "data": [  ] = response.map((sp:any)=> ({value: sp.currentPrice,
         label:this.getDateForLabel(sp)  })  )
    }]

    console.log("getSeries dataset:", dataset);
    return dataset;
  }

  getDateForLabel(sp:any){
    if(this.periodicity == 'hourly')
    return (new Date(sp.date[0],sp.date[1],sp.date[2],sp.time[0])).toISOString();
    else if(this.periodicity == 'daily')
    return (new Date(sp.date[0],sp.date[1],sp.date[2])).toISOString();
    else if(this.periodicity == 'monthly')
    return (new Date(sp.date[0],sp.date[1])).toISOString();
    else
    return (new Date(sp.date[0])).toISOString();
    
  }
  
  formatDate(Date:any){
   return Date.year+'-'+(Date.month<10 ? '0'+Date.month : Date.month)+'-'+(Date.day<10 ? '0'+Date.day : Date.day);
  }

}
