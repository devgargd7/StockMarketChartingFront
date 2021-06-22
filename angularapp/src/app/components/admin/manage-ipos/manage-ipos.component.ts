import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPO } from 'src/app/models/IPO';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-ipos',
  templateUrl: './manage-ipos.component.html',
  styleUrls: ['./manage-ipos.component.css']
})
export class ManageIPOsComponent implements OnInit {


  IPOList:IPO[];
  showIPOForm=false;
  page=1;
  pageSize=10;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getAllIPOs():void{
    this.http.get(`${environment.CompanyServiceApiUrl}/admin/ipos`).subscribe(
      (response) => {
        console.log(response);
        this.IPOList=<IPO[]>response;
      },
      (error) => console.log(error)
    )
  }

  addIPO():void{
    this.showIPOForm=!this.showIPOForm;
  }

  addIPOSuccess(e:string){
    console.log(e);
    this.showIPOForm=!this.showIPOForm;
  }
}

