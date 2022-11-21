import {Component, HostBinding, OnInit} from '@angular/core';
import { AppState } from '../../store/state';
import { UiState } from '../../store/ui/state';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../core/services/authentication.service';

const BASE_CLASSES = 'main-sidebar elevation-4';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui: any;
  public user:any
  public menu = MENU;

  constructor( public appService: AuthenticationService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ui = this.store.select('ui');
        // this.ui.subscribe((state: UiState) => {
        //     this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        // });
        this.user = this.appService.getCurrentUser();
  }

}

export const MENU = [
  {
      name: 'Dashboard',
      iconClasses: 'fas fa-tachometer-alt',
      path: ['/app/dashboard']
  },
  {
      name: 'Users',
      iconClasses: 'fas fa-user',
      path: ['/app/user/list']
  },
  {
      name: 'Main Menu',
      iconClasses: 'fas fa-folder',
      children: [
          {
              name: 'Sub Menu 1',
              iconClasses: 'far fa-address-book',
              path: ['/#']
          },
          {
              name: 'Sub Menu 2',
              iconClasses: 'fas fa-file',
              path: ['/#']
          }
      ]
  }
];
