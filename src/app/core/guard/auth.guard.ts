import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service'
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.authenticationService.isAuhenticated();
    if (isAuthenticated) {
        return true;
    }
    this.router.navigate(['/auth/login']);
    return false;  }
}
