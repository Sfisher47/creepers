import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

    @Input() contact: Contact;
    favorite: boolean;
    isWorking: boolean;

    constructor(
        private contactService: ContactService
    ) {}

    ngOnInit() {
        this.favorite = this.contact.favorite;
    }

    refresh() {
        this.isWorking = true;
        this.contactService.read(this.contact.id).subscribe(
            (res) => {
                this.isWorking = false;
                this.favorite = res.favorite;
            }
        )
    }

    onLike() {        

        let contact = {
            favorite: this.favorite ? false : true
        } as unknown as Contact;

        this.isWorking = true;
        this.contactService.update(this.contact.id, contact).subscribe(
            null,
            null,
            () => {
                this.refresh();
            }
        )
    }
}
