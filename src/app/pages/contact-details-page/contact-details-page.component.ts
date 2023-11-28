import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Subscription, Observable, switchMap, map } from 'rxjs'
import { UserService } from '../../services/user-service.service';
import { Transactions } from '../../models/user';


@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit {
  // @Input() selectedContact!: Contact | null
  // @Output() unselectedContact = new EventEmitter()

  // constructor(
  //   private contactService: ContactService,
  //   private router: Router
  // ) { }

  private contactService = inject(ContactService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  subscription!: Subscription
  contact: Contact | null = null
  contact$!: Observable<Contact>

  userService = inject(UserService)
  contactId: string = ''
  contactMoves: Transactions[] = []
  user = this.userService.getLoggedInUserFromStorage()

  async ngOnInit(): Promise<void> {
    // this.contact$ = this.route.data.pipe(map(data => data['contact']))
    this.contact$ = this.route.params.pipe(
      switchMap(params => this.contactService.getContactById(params['id']))
    )

    this.route.params.subscribe(params => {
      this.contactId = params['id']
    })
    this.getContactMoves()
  }

  getContactMoves(){
    this.contactMoves=this.user!.moves.filter(move => move.toId?.includes(this.contactId))
  }
  // OnSelectContact(contactId: string) {
  //   console.log('this.contacts:', this.contacts)
  //   this.contactService.getContactById(contactId)
  //     .subscribe(
  //       (contact: Contact) => {
  //         this.selectedContact = contact; 
  //         console.log('Retrieved contact:', this.selectedContact);
  //       },
  //       error => console.error('Error retrieving contact:', error)
  //     );
  // }


  onGoBack() {
    this.router.navigateByUrl('/contact')
  }
}
