import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


import { ContactService } from '../../services/contact.service';
import { ContactFilter } from '../../models/contact.model';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit {
  contactService = inject(ContactService)
  filterBy!: ContactFilter
  filterSubject$ = new Subject()
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.contactService.filterBy$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })

    this.filterSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.contactService.setFilterBy(this.filterBy)
      })

  }

  onSetFilter(val: string) {
    this.filterSubject$.next(val)
    // this.contactService.setFilterBy(this.filterBy)
  }

}
