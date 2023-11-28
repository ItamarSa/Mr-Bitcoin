import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { Transactions, User } from '../../models/user';
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {

  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)
  private route = inject(ActivatedRoute)

  user$: Observable<User> | null = null
  coins: number = 0
  rate: string = ''

  userMoves:Transactions[]=[]
  user=this.userService.getLoggedInUserFromStorage()


  ngOnInit(): void {
    this.getUserCoins()
    this.getUserMoves()
  }
  
  getUserMoves() {
    this.userMoves = this.user!.moves.slice(0, 3)
  }


  ngOnDestroy(): void {

  }

  async getUserCoins(): Promise<void> {
    this.route.params.subscribe(params => {
      const userId = params['id']
      this.user$ = this.userService.getById(userId)
      this.user$.subscribe((user: User) => {
        this.coins = user.coins
        this.getRateCoins()
      })
    })
  }

  async getRateCoins(): Promise<void> {
    this.bitcoinService.getRate(this.coins).subscribe(rate => {
      if (rate !== null && rate !== undefined && rate !== '') {
        this.rate = rate.toString()
        console.log('this.rate', this.rate)
      } else {
        console.log('Rate is empty or invalid')
      }
    }, err => { console.error('can find rate', err) })
  }
}
