import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, inject } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from '../../services/user-service.service';
import { Transactions, User } from '../../models/user';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrl: './transfer-fund.component.scss'
})
export class TransferFundComponent implements OnInit, OnDestroy {

  private contactService = inject(ContactService)
  private userService = inject(UserService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  user = this.userService.getLoggedInUserFromStorage()
  transferAmount:number = 0

  // private formBuilder = inject(FormBuilder)
  // private contactId: string = '';
  // isMsg: boolean = false
  // msg: string = ''
  contact!: Contact

  destroySubject$ = new Subject<void>()

  // contact = this.contactService.getEmptyContact()

  // constructor(
  //   ) {
  //     this.contactForm = this.formBuilder.group({
  //       coins: null,
  //     });
  //   }

  ngOnInit(): void {
    console.log('user', this.user)

    this.route.params
      .pipe(
        takeUntil(this.destroySubject$),
        map(params => params['id']),
        // filter(id => id),
        tap((id)=>console.log('id', id)),
        switchMap(id => this.contactService.getContactById(id))
      )
      .subscribe(contact => {
        this.contact = contact
      })
  }

  onTransferCoin(val: number) {
    console.log('val', val)
    const transactions: Transactions = {
      toId: this.contact._id,
      to: this.contact!.name,
      coins: val,
      at:new Date()
    }

    if (this.user && this.user.coins >= val) {
      this.user.coins -= val,
      (this.user.moves as Transactions[]).unshift(transactions)
      console.log('this.user', this.user)

      this.contact.coins! += val
      console.log('this.contact', this.contact)
      this.contactService.saveContact(this.contact as Contact)
            this.userService.save(this.user as User)
            this.userService.saveLoggedInUser(this.user as User)
            this.router.navigateByUrl('contact')

    }



  }

  ngOnDestroy(): void {
    this.destroySubject$.next()
  }

}
