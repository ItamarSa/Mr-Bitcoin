import { Component, inject } from '@angular/core'
import { UserService } from '../../services/user-service.service'
import { User } from '../../models/user'

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  private userService = inject(UserService)
  loggedInUser: User | null = null 
  userId: string=''
  
  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user
      this.userId = user ? user._id : ''
      console.log('Updated loggedInUser:', this.loggedInUser)
    })
  }

}
