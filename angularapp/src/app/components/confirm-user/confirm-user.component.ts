import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {

  constructor(private http:HttpClient,
    private authService:AuthenticationService,
    private router: Router,) { }

  ngOnInit(): void {
    if (!this.authService.currentUserValue){
      this.router.navigate(['/login']);
    }
  }

  sendMail(){
    // console.log(this.authService.currentUserValue.username);
    this.http.get(`${environment.UserApiUrl}/confirm/`+this.authService.currentUserValue.username).subscribe(
      (response) => {
        console.log(response);
        this.authService.logout();
    this.router.navigate(['/login']);
      },
      (error) => console.log(error)
    )
  }
}
