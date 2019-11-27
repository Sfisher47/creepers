
import { Injectable } from '@angular/core';
import {SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  isShowing = false;

  style = 'material';
  title = 'Snotify title!';
  body = 'Lorem ipsum dolor sit amet!';
  timeout = 2000;
  position: SnotifyPosition = SnotifyPosition.rightTop;
  progressBar = false;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;

  constructor(private snotifyService: SnotifyService) {
  }

  present(msg: string = 'Some notification text', type: string = 'alert') {
  }

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
      iconClass: 'yes',
    };
  }

  info(msg: string = 'Some notification text') {
    this.snotifyService.info(msg, null, this.getConfig());
  }

  success(msg: string = 'Some notification text') {
    this.snotifyService.success(msg, null, this.getConfig());
  }

  error(msg: string = 'Some notification text') {
    this.snotifyService.error(msg, null, this.getConfig());
  }

  dismiss() {
    this.isShowing = false;
    if (this.snotifyService) { this.snotifyService.clear(); }
  }
}