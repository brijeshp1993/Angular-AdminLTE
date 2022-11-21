import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import{FormsModule,ReactiveFormsModule} from '@angular/forms'
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {defineCustomElements} from '@profabric/web-components/loader';
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/core/services/user.service';


defineCustomElements();

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProfabricComponentsModule,
    HttpClientModule
  ],
  providers:[
    UserService
  ]
})
export class AuthModule { }
