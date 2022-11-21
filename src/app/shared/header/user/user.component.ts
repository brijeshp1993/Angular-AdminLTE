import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user:any;

  constructor(private appservice: AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.appservice.getCurrentUser();
}

logout() {
    this.appservice.removeCurrentUser();
}

}
