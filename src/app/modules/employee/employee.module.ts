import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{FormsModule,ReactiveFormsModule} from '@angular/forms'
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeService } from './service/employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import {MatDialogModule} from '@angular/material/dialog';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
// import { toasterservice } from 'src/app/core/services/toaster.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader/lib/core/ngx-ui-loader.service';
import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [
    EmployeeAddComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTablesModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  entryComponents:[
    EmployeeAddComponent
  ],
  providers:[

    EmployeeService,
    //toasterservice
  ]
})
export class EmployeeModule { }
