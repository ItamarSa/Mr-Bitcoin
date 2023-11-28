import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { ContactService } from '../services/contact.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Mr-Bitcoin';

  private userService = inject(UserService)
  private contactService = inject(ContactService)
  subscription!: Subscription

  ngOnInit(): void {

    this.subscription = this.userService.query()
      .pipe(take(1))
      .subscribe({
        error: err => console.log('err:', err)
      })
    this.subscription = this.contactService.loadContacts()
      .pipe(take(1))
      .subscribe({
        error: err => console.log('err:', err)
      })

  }
}
