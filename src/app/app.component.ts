import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { fadeInOutAnimation, routerFadeInOutAnimation } from './utils/animations.utils';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOutAnimation, routerFadeInOutAnimation]
})
export class AppComponent {
  title = 'creepers';

  constructor(private appService: AppService){
    
  }

  doRouterFadeInOutAnimation(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
