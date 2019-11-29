import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Media } from 'src/app/models/media.model';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent {
    
    media: Media;
    isWorking: boolean;

    errorExt: boolean;
    errorSize: boolean;

    progress: number = -1;

    @Output() upload: EventEmitter<string> = new EventEmitter();
  
    constructor(
      private mediaService: MediaService,
      private router:Router
    ){}
  
    ngOnInit() {
      this.media = new Media();
    }

    onFileDelete() {
        this.isWorking = true;
        this.mediaService.delete(this.media.photo).subscribe(
            (res) => {
                this.media = {} as Media;
                this.upload.emit("");
            }, 
            () => {},
            () => { this.isWorking = false }
        );
    }
    
    isControlInvalid() {
        return this.errorExt || this.errorSize;
    }

    onFileSelect($event:any) {
        this.errorExt = false;
        this.errorSize = false;

        if ($event.target.files.length > 0) {
          const file = $event.target.files[0];
          
          const ext = file.name.split('.').pop();
          const size = file.size / 1024 / 1024;
    
          if (!ext || ( ext != 'jpg' && ext != 'jpeg' && ext != 'png' && ext != 'gif'&& ext != 'bmp')){
            this.errorExt = true;
            return false;
          }
    
          if( size > 2) {
            this.errorSize = true;
            return false;
          }
  
          this._doUploadFile(file);
        }
    }

    _doUploadFile(file: any) {

        let fData = new FormData();
        fData.append('photo', file);
        this.mediaService.upload(fData).subscribe(
          (res) => {
            if(res.status == 'progress') {
                this.progress = res.value;
                //console.log(res.value);
            }
  
            if(res.photo) {
              this.media = res;
              this.upload.emit(this.media.photo);
              setTimeout(()=>{
                this.progress = -1;
              }, 300);
              
            }
          }
        );
    }
}
