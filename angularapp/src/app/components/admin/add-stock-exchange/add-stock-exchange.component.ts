import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/models/Alert';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-stock-exchange',
  templateUrl: './add-stock-exchange.component.html',
  styleUrls: ['./add-stock-exchange.component.css']
})
export class AddStockExchangeComponent implements OnInit {

  // @Input("update") update=false;
  // @Input("companyToBeUpdated") companyToBeUpdated:Company;
  // @Output() successSubmission = new EventEmitter<string>();

  addExchangeForm:FormGroup;
  // alert:Alert
  constructor(private http: HttpClient,
    private fb:FormBuilder,
    private router: Router) { 
      // this.alert.message="";
    }

  ngOnInit(): void {
    this.addExchangeForm = this.fb.group({
      stockExchangeName: ['',Validators.required],
      contactAddress: [''],
      remarks: [''],
      brief: ['']
    });
  }
  onSubmit(){
    var seName =this.addExchangeForm.get('stockExchangeName');
    this.http.post(`${environment.StockExchangeServiceApiUrl}/admin/stockexchanges/add`, this.addExchangeForm.value).subscribe(
      (response) => {
        console.log(response);
        // this.successSubmission.emit(this.addCompanyForm.get('companyName').value);
        // this.alert.type="info";
        // this.alert.message="Added"+ seName+". Click List All to list."
      },
      (error) => {console.log(error);
      //   this.alert.type="danger";
      // this.alert.message=JSON.stringify(error);
    }

    )
  }
  // closeAlert(){
  //   this.alert.message="";
  // }

}
