import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  private userService = inject(UserService)
  private router = inject(Router)
  userName: string = ''

  async getUserByName(name: string): Promise<void> {
    this.userService.getByName(name).subscribe((result: User | string) => {
      if (typeof result === 'string') {
        console.log('User not found, saving...')
        this.userService.saveUser(name).subscribe((newUser: User | string) => {
          if (typeof newUser !== 'string') {
            const user = newUser as User;
            this.userService.saveLoggedInUser(user)
            this.getUserAndNavigate(user._id)
          } else {
            console.log('Error creating user')
          }
        })
      } else {
        const user = result as User
        console.log('User exists:', user)
        this.userService.saveLoggedInUser(user)
        this.getUserAndNavigate(user._id) // Navigate if user already exists
      }
    })
  }

  private getUserAndNavigate(name: string): void {
    this.userService.getByName(name).subscribe((user: User | string) => {
      if (typeof user !== 'string') {
        const userId = user._id
        this.router.navigate(['home', userId]) // Pass userId directly as the parameter
      }
    })
  }

  onSubmit(): void {
    if (this.userName.trim() !== '') {
      this.getUserByName(this.userName.trim())
    }
  }
}