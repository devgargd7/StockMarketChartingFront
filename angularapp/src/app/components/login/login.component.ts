import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required], //, Validators.required, Validators.minLength(3)
    password: ['', Validators.required] //, Validators.required, Validators.pattern("/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/")
  });
  returnUrl: string;
  error:string;
  submitted:boolean;

  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue){
      this.router.navigate(['/']);
    }
    this.submitted=false;
   }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(){
    // console.log(this.loginForm);
    // if (this.loginForm.invalid) {
    //   console.log("invalid")
    //   return;
    // }

    this.authenticationService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)

    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.error = error;
        });
  }
}
