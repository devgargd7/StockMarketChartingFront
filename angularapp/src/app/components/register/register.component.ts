import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['',[Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")]],
    email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    mobileNumber:['']
  });

  // confirmPassword:String;
  submitted=false;
  returnUrl:string;

  constructor(
    private fb:FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) {
      this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationStart) { if (this.authService.currentUserValue) authService.logout();}
      });
    }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(){
    // console.log(this.registerForm);
    // this.submitted =true;
    // this.registerForm.value["confirmed"] = false;
    // console.log(this.registerForm.value);

    this.http.post(`${environment.UserApiUrl}/register`, this.registerForm.value).subscribe(
      (response) => {
        // console.log(response);
        this.router.navigate([this.returnUrl]);
      },
      (error) => console.log(error)
    )
  }
}
