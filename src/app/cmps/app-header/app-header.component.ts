import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit {

  private userService = inject(UserService)
  loggedInUser: User | null = null
  userId: string = ''

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user
      this.userId = user ? user._id: ''
      console.log('this.userId', this.userId);
      
      }
    )
  }
}
