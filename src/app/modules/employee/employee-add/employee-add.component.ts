import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { toasterservice } from 'src/app/core/services/toaster.service';
import Validation from '../../auth/validation/validation';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  submitted: boolean = false;
  registerForm = new FormGroup(
    {
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      retypePassword: new FormControl('', Validators.required),
    },
    {
      validators: [Validation.match('password', 'retypePassword')],
    }
  );
  title: any;
  isadd:any=false;
  dataid:any;

  constructor(
    private toast: toasterservice,
    private ngxService: NgxUiLoaderService,
    private empservice: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.action == 'add') {
      this.title = 'Add User';
      this.isadd=true;
    } else {
      this.title = 'Edit User';
      this.getuserbyid(this.data.id);
      this.dataid=this.data.id;
      this.isadd=false;
    }
  }

  getuserbyid(id: any) {
    this.empservice.getuserbyid(id).subscribe({
      next: (data: any) => {
        this.registerForm.setValue({
          email:    data.email,
          password : data.password,
          firstname : data.firstname,
          lastname : data.lastname,
          retypePassword : data.password
        });
      },
    });
  }

  adduser() {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.ngxService.start();

      try {
        var data: any = {
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          firstname: this.registerForm.value.firstname,
          lastname: this.registerForm.value.lastname,
        }
        if(this.isadd){
          this.empservice.add(data).subscribe({
            next: (data: any) => {
              this.toast.showSuccess('user created successfully', 'Wow!');
              this.dialogRef.close({ data: true });
            },
          });
        }
        else{
          this.empservice.updateUser(data,this.dataid).subscribe({
            next: (data: any) => {
              this.toast.showSuccess('user updated successfully', 'Wow!');
              this.dialogRef.close({ data: true });
            },
          });        }
      } catch (error) {
        this.ngxService.stop();
      }
    } else {
      this.toast.showError('user form is not valid', 'validation');
    }
    this.ngxService.stop();
  }

  get f() {
    return this.registerForm.controls;
  }
}
