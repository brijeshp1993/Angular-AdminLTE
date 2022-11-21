import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './blank/blank.component';
import { DashboardBoardComponent } from './dashboard-board/dashboard-board.component';

const routes: Routes = [{
  path: 'blank',
  component: BlankComponent
},{
  path: '',
  component: DashboardBoardComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
