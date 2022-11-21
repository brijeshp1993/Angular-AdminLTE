import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private router: Router){

  }
  public getCurrentUser(): any {
    var user = localStorage.getItem('currentUser');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }
  public removeCurrentUser(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);

  }

  public setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  public isAuhenticated(): boolean {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return true;
    }
    return false;
  }
}
