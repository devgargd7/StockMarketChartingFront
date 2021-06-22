import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-update-profile',
  templateUrl: './user-update-profile.component.html',
  styleUrls: ['./user-update-profile.component.css']
})
export class UserUpdateProfileComponent implements OnInit {

  currentUser:User;
  mobileNumber:any;
  newPassword:any;
  
  constructor(private authenticationService: AuthenticationService,
    private http: HttpClient) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
  }

  addMobileNumber(){
    this.http.post(`${environment.UserApiUrl}/update/mobile`, this.mobileNumber).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    )
  }

  updatePassword(){
    this.http.post(`${environment.UserApiUrl}/update/password`, this.newPassword).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    )
  }

}
