import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit, OnDestroy {
  
  contactService = inject(ContactService)
  contacts$!:Observable<Contact[]>
  prm = Promise.resolve(999999)
  selectedContactId!: string
  
  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$
    // console.log('this.contacts$', this.contacts$ )
    
  }

  // onSelectContact(contactId: string){
  //   this.contactService.getContactById(contactId).subscribe({
  //     error: err => console.log('err', err)
      
  //   })
  // }

  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId)
        .subscribe({
            error: err => console.log('err:', err)
        })
}

  ngOnDestroy(): void {
    
  }

}
