import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelData } from 'src/app/models/ExcelData';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {

  importData: ExcelData[];
  importedData: boolean[];
  page=1;
  pageSize=10;
  fileSelected=false;

  constructor(
    private http: HttpClient, 
    private router: Router,) {
    // this.importedData=null;
   }

  ngOnInit(): void {
  }

  onFileChange(event: any){
      const target: DataTransfer= <DataTransfer>(event.target);
      if (target.files.length == 1) this.fileSelected=true;
      else this.fileSelected=false;
      
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      
      reader.onload = (e: any) => {
        // console.log("reader ready")
        const binarystr = e.target.result;
        // console.log(binarystr);
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary',cellText:false,cellDates:true });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 , raw:false, dateNF:'yyyy-mm-dd'});
        const importData = <String[][]>data.slice(1, -1);
        // console.log(importedData);
        this.importData = importData.map(arr => {
          return new ExcelData(<String[]>arr);
        })
        
    }
  }

  Upload(){
    this.http.post(`${environment.importDataApiUrl}/admin/import`, this.importData).subscribe(
      (response) => {
        console.log(response);
        this.importedData = <boolean[]>response;
      },
      (error) => console.log(error)
    )
  }
}
