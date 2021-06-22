import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { StockExchange } from 'src/app/models/StockExchange';
import { Companies, stockExchanges } from 'src/app/services/mock-comanies';
import { environment } from 'src/environments/environment';
import {NgbCalendar, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-add-ipo',
  templateUrl: './add-ipo.component.html',
  styleUrls: ['./add-ipo.component.css']
})
export class AddIpoComponent implements OnInit {
 
  @Output() successSubmission = new EventEmitter<string>();
  
  companies: Company[];
  stockExchanges: StockExchange[];
  addIPOForm:FormGroup;
  submited=false;

  model: NgbDateStruct = this.calendar.getToday();
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};

  formatter = (company: Company) => company.companyName;

  search: OperatorFunction<string, readonly Company[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(50),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.companies.filter(company => new RegExp(term, 'mi').test(company.companyName)).slice(0, 10))
  )

  constructor(private http: HttpClient,
    private calendar: NgbCalendar,
    private fb:FormBuilder,
    private router: Router) {
     }

  ngOnInit(): void {
    this.getAllComapnies();
    this.stockExchanges=stockExchanges;
    this.addIPOForm = this.fb.group({
      companyName:['',Validators.required],
      stockExchanges:['',Validators.required],
      pricePerShare:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      totalNumberOfShares:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      openDateTime:['',Validators.required],
      remarks:[''],
    });
    
    if (this.addIPOForm.get('companyName').valueChanges != null) {
      this.addIPOForm.get('companyName').valueChanges.subscribe((value: any) => {
        
        if(this.addIPOForm.get('companyName').valid) {
          console.log(this.addIPOForm.get('companyName').value.stockCodes.map( (sc:any) => sc.stockExchange.stockExchangeName ));
          this.stockExchanges=this.addIPOForm.get('companyName').value.stockCodes.map( (sc:any) => sc.stockExchange );
        }
      });
  }

    this.setOpenDateTime();
  }

  getAllComapnies():void{
    this.http.get(`${environment.CompanyServiceApiUrl}/admin/companies`).subscribe(
      (response) => {
        console.log(response);
        this.companies=<Company[]>response;
      },
      (error) => console.log(error)
    )
  }
  
  setOpenDateTime(){
    
    this.addIPOForm.get('openDateTime').setValue(
      this.model.year+'-'+(this.model.month<10 ? '0'+this.model.month : this.model.month)+'-'+(this.model.day<10 ? '0'+this.model.day : this.model.day)
      +' '+this.time.hour+':'+this.time.minute+':'+this.time.second);
  }

  setStockExchanges(se:String,e:any){
    if(e.checked) this.addIPOForm.get('stockExchanges').setValue(this.addIPOForm.get('stockExchanges').value+se+",");
    else if(!e.checked) this.addIPOForm.get('stockExchanges').setValue(this.addIPOForm.get('stockExchanges').value.replace(se+',',''));
  }
  

  onSubmit(){
    console.log(this.addIPOForm.value);
    var postObject = this.addIPOForm.value;
    postObject.companyName = postObject.companyName.companyName;
    this.http.post(`${environment.CompanyServiceApiUrl}/admin/ipos/add`, postObject).subscribe(
      (response) => {
        console.log(response);
        // this.successSubmission.emit(this.addIPOForm.get('companyName').value);
      },
      (error) => console.log(error)
    )
  }

}
