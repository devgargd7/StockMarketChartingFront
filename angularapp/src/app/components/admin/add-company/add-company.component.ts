import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sector } from 'src/app/models/Sector';
import { StockExchange } from 'src/app/models/StockExchange';
import { sectors, stockExchanges  } from 'src/app/services/mock-comanies';
import { environment } from 'src/environments/environment';
import { Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { of } from 'rxjs';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  @Input("update") update=false;
  @Input("companyToBeUpdated") companyToBeUpdated:Company;
  @Output() successSubmission = new EventEmitter<string>();
  
  sectors:Sector[];
  stockExchanges: StockExchange[];
  cSEMap :FormArray;
  addCompanyForm:FormGroup;
  submited=false;

  constructor(private http: HttpClient,
    private fb:FormBuilder,
    private router: Router) {
      
     }

  ngOnInit(): void {
    // this.sectors=sectors; //getsectors 
    // this.stockExchanges=stockExchanges; //getstockexchanges
    
    

    this.addCompanyForm = this.fb.group({
      companyName: ['',Validators.required],
      turnover: ['',Validators.pattern("^[0-9]*$")],
      ceo: [''],
      boardOfDirectors: [''],
      stockExchanges: ['',Validators.required],
      sector: ['',Validators.required],
      brief: ['']
    });

    this.cSEMap = this.fb.array([]);
    // this.buildCSEMap();
    this.getAllSectors();
    this.getAllStockExchanges();

    if(this.update == true && this.companyToBeUpdated) {
      this.addCompanyForm.get('companyName').setValue(this.companyToBeUpdated.companyName);
      this.addCompanyForm.get('sector').setValue(this.companyToBeUpdated.sector);
    }
  }

  onSubmit(){
    var submittedForm = {
      companyDto: this.addCompanyForm.value,
      stockCodeDtos: this.cSEMap.value.filter((object:any) => object.se).map(
        (object:any,i:number) => ({stockExchange:stockExchanges[i].stockExchangeName,
                                    stockCode:object.stockCode}))
    }

    console.log(submittedForm);
    if(this.update){
      this.http.put(`${environment.CompanyServiceApiUrl}/admin/companies/update/`+ this.companyToBeUpdated.id, submittedForm).subscribe(
        (response) => {
          console.log(response);
          // this.successSubmission.emit(this.addCompanyForm.get('companyName').value);
        },
        (error) => console.log(error)
      )
    }
    else{

      this.http.post(`${environment.CompanyServiceApiUrl}/admin/copmanies/add`, submittedForm).subscribe(
        (response) => {
          console.log(response);
          // this.successSubmission.emit(this.addCompanyForm.get('companyName').value);
        },
        (error) => console.log(error)
      )
    }
  }

getAllSectors(){
  this.http.get(`${environment.SectorServiceApiUrl}/admin/sectors`).subscribe(
    (response) => {
      console.log(response);
      this.sectors = <Sector[]> response;
    },
    (error) => console.log(error)
  )
}

getAllStockExchanges(){
  this.http.get(`${environment.StockExchangeServiceApiUrl}/admin/stockexchanges`).subscribe(
    (response) => {
      console.log(response);
      this.stockExchanges = <StockExchange[]> response;
      this.buildCSEMap();
    },
    (error) => console.log(error)
  )
}

buildCSEMap(){
  // const fg = new FormGroup({
  //   se: new FormControl(),
  //   stockCode: new FormControl()
  // });
  
  for(let [i,se] of this.stockExchanges.entries()){
    this.addCSEMap();
  }
  console.log(this.cSEMap);
}

addCSEMap(){
  const fg = this.fb.group({
                            se: [''],
                            stockCode: ['']
                          }) as FormGroup;
  this.cSEMap.push(fg);
}
getfgat(i:number){
  return this.cSEMap.at(i) as FormGroup;
}

setStockExchanges(se:String,e:any){
  if(e.checked) this.addCompanyForm.get('stockExchanges').setValue(this.addCompanyForm.get('stockExchanges').value+se+",");
  else if(!e.checked) this.addCompanyForm.get('stockExchanges').setValue(this.addCompanyForm.get('stockExchanges').value.replace(se+',',''));
}

}
