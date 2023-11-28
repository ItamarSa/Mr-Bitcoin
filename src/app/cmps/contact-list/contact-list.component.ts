import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Contact } from '../../models/contact.model';
// import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {
  @Input() contacts!: Contact[] | null
  @Output() remove = new EventEmitter()
  // @Output() select = new EventEmitter()

  // contactService = inject(ContactService)
  // selectedContact: Contact | null = null

  ngOnInit(): void {
    // console.log('this.contacts', this.contacts);

  }

  trackByFn(idx: number, contact: Contact) {
    return contact._id
  }

  // onGoBack() {
  //   this.selectedContact = null;
  // }

}