import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { SharedModule } from './shared/shared.module';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import {uiReducer} from './store/ui/reducer';
import { EmployeeListComponent } from './modules/employee/employee-list/employee-list.component';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfabricComponentsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),

    StoreModule.forRoot({ ui: uiReducer}),
    SharedModule,
    DataTablesModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
