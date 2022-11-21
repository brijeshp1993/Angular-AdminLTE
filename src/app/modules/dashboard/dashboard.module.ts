import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardBoardComponent } from './dashboard-board/dashboard-board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlankComponent } from './blank/blank.component';


@NgModule({
  declarations: [
    DashboardBoardComponent,
    BlankComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
