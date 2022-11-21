import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { toasterservice } from '../../../core/services/toaster.service';
import { UserService } from '../../../core/services/user.service';
import {ErrorStateMatcher} from '@angular/material/core';
import Validation from '../validation/validation';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @HostBinding('class') class = 'register-box';
  submitted:boolean=false;
  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email] ),
    password: new FormControl('', Validators.required),
    retypePassword: new FormControl('', Validators.required),
  },
  {
    validators: [Validation.match('password', 'retypePassword')]
  });
  constructor(
    private renderer: Renderer2,
    private toast: toasterservice,
    private registerservice: UserService,
    private route: Router,
    private ngxService: NgxUiLoaderService

  ) {}

  registerByAuth() {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.ngxService.start();

      try {
        var data: any = {
          firstname: this.registerForm.value.firstname,
          lastname: this.registerForm.value.lastname,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
        };
        this.registerservice.register(data).subscribe({
          next: (data: any) => {
            this.toast.showSuccess('Register successfully', 'register');
           this.route.navigate(['/auth/login']);
          },
        });
      } catch (error) {
        this.ngxService.stop();

      }
    } else {
      this.toast.showError('register form is not valid', 'validation');
    }
    this.ngxService.stop();

  }

 get f(){
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'register-page');
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'register-page');
  }
}
