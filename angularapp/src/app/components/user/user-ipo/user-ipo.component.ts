import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPO } from 'src/app/models/IPO';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-ipo',
  templateUrl: './user-ipo.component.html',
  styleUrls: ['./user-ipo.component.css']
})
export class UserIpoComponent implements OnInit {

  IPOList:IPO[];
  page=1;
  pageSize=10;
  
  constructor(private http: HttpClient ) { }

  ngOnInit(): void {
    this.getAllIPOs();
  }

  getAllIPOs():void{
    this.http.get(`${environment.CompanyServiceApiUrl}/user/ipos`).subscribe(
      (response) => {
        console.log(response);
        this.IPOList=<IPO[]>response;
      },
      (error) => console.log(error)
    )
  }


}
