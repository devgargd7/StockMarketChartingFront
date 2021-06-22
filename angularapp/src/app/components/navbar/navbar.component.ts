import { Component, OnInit } from '@angular/core';
import { Role, User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   
  currentUser:User;
  userType:String;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.userType = this.currentUser.userType;
    // console.log(this.userType);
   }

  ngOnInit(): void {
  }

}
