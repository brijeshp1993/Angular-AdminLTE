import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @HostBinding('class') classes: string = 'main-footer';
 // public appVersion = packageInfo.version;
  //public currentYear: string = DateTime.now().toFormat('y');

}
