import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/main/main.component';
import{AuthGuard} from '../app/core/guard/auth.guard'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'app',
    component: MainComponent,
    canActivate:[AuthGuard],
    children: [{
      path: 'dashboard',
      loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'user',
      loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
    }
  ]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
