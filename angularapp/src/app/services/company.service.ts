import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../models/Company';
import { Companies, sectors, stockExchanges } from './mock-comanies';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // companies: Observable<Company[]>;

  constructor() {

   }
   getCompanies(): Observable<Company[]>{
    const companies = of(Companies);
     return companies;
   } 
}
