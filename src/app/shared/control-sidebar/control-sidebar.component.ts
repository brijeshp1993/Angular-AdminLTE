import { AppState } from '../../store/state';
import { ToggleSidebarMenu , SetNavbarVariant,
  SetSidebarSkin,
  ToggleDarkMode} from '../../store/ui/actions';
import { UiState } from '../../store/ui/state';
import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Option,
  NAVBAR_LIGHT_VARIANTS,
  NAVBAR_DARK_VARIANTS,
  SIDEBAR_DARK_SKINS,
  SIDEBAR_LIGHT_SKINS
} from '../../utils/themes';

@Component({
  selector: 'app-control-sidebar',
  templateUrl: './control-sidebar.component.html',
  styleUrls: ['./control-sidebar.component.css']
})
export class ControlSideBarComponent implements OnInit {
  @HostBinding('class') class = 'control-sidebar control-sidebar-dark';
  public ui: any;
  public navbarLightVariants: Array<Option> = NAVBAR_LIGHT_VARIANTS;
  public navbarDarkVariants: Array<Option> = NAVBAR_DARK_VARIANTS;
  public darkSidebarSkins: Array<Option> = SIDEBAR_DARK_SKINS;
  public lightSidebarSkins: Array<Option> = SIDEBAR_LIGHT_SKINS;
  public ui1: any;
  public navbarVariant: any;
  public darkMode: any;
  public sidebarSkin: any;



  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
        this.navbarVariant = state.navbarVariant;
        this.darkMode = state.darkMode;
        this.sidebarSkin = state.sidebarSkin;
    });
  }
  public handleDarkModeChange(event: any) {
    console.log('value', event.target.checked);
    this.store.dispatch(new ToggleDarkMode());
}

public onNavbarVariantChange(event: any) {
    console.log('value', event.target.value);
    this.store.dispatch(new SetNavbarVariant(event.target.value));
}

public onSidebarSkinChange(event: any) {
    console.log('value', event.target.value);
    this.store.dispatch(new SetSidebarSkin(event.target.value));
}
}
