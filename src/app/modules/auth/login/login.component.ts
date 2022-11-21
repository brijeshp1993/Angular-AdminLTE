import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { toasterservice } from '../../../core/services/toaster.service';
import{AuthenticationService} from '../../../core/services/authentication.service'
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') class = 'login-box';
  public loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });
  validateuser: boolean = false;
  submitted:any=false;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private loginservice: UserService,
    private toast: toasterservice,
    private authenticationservice:AuthenticationService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    if (this.authenticationservice.isAuhenticated()) {
      this.router.navigate(['/app/dashboard']);
    }
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');

  }
  get f(){
   return this.loginForm.controls;
  }
  async loginByAuth() {
    this.submitted=true;
    if(this.loginForm.valid){
      this.ngxService.start();

    var data1 = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.loginservice.login().subscribe((data: any[]) => {
    let userlist= data;
      userlist.forEach((x) => {
        if (x.email.toLowerCase() == data1.email && x.password == data1.password) {
          this.validateuser = true;
          this.authenticationservice.setCurrentUser(x);
          // this.toast.showSuccess('Login Successful', 'Login success');
          // this.router.navigate(['/app/dashboard']);
        }
      });
    });
    await new Promise(f => setTimeout(f, 3000));

   // this.validateuser= this.loginservice.login(data);
    if (this.validateuser) {
      this.validateuser=false;
      this.toast.showSuccess('Login Successful', 'Login success');
      this.router.navigate(['/app/dashboard']);
    } else {
      this.toast.showError('User or email not exits', 'Login Error');
    }
    this.ngxService.stop();
  }
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
