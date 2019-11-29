import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { fadeInOutAnimation } from './utils/animations.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOutAnimation]
})
export class AppComponent {
  title = 'creepers';

  constructor(private appService: AppService){
    
  }
}
