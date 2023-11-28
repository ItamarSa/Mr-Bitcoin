import { Component, Input } from '@angular/core';
import { Transactions } from '../../models/user';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrl: './moves-list.component.scss'
})
export class MovesListComponent {
  @Input() move!: Transactions

}
