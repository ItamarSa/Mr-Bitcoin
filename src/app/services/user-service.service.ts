import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, from, map, of, retry, take, tap, throwError } from 'rxjs';
import { User, UserFilter } from '../models/user';
import { storageService } from './async-storage.service';
import { SafeResourceUrl } from '@angular/platform-browser';

const ENTITY = 'users'
const LOGGED_IN_USER_KEY = 'LOGGED_IN_USER_KEY'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    const users = JSON.parse(localStorage.getItem(ENTITY) || 'null')
    if (!users || users.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createUsers()))
    }
  }

  private _users$ = new BehaviorSubject<User[]>([])
  public users$ = this._users$.asObservable()

  private loggedInUserSubject = new BehaviorSubject<User | null>(this.getLoggedInUserFromStorage())
  loggedInUser$ = this.loggedInUserSubject.asObservable()

  private _filterBy$ = new BehaviorSubject<UserFilter>({ term: '' })
  public filterBy$ = this._filterBy$.asObservable()

  public query() {
    return from(storageService.query<User>(ENTITY))
      .pipe(
        tap(users => {
          const filterBy = this._filterBy$.value
          users = users.filter(user => user.name.toLowerCase().includes(filterBy.term.toLowerCase()))
          this._users$.next(users)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getById(userId: string): Observable<User> {
    return from(storageService.get<User>(ENTITY, userId))
      .pipe(
        retry(1),
        catchError(this._handleError)
      )

  }

  public getByName(username: string): Observable<User | string> {
    return from(storageService.get<User>(ENTITY, username))
      .pipe(
        map(user => user || 'User not found'),
        catchError(error => {
          console.error('Error fetching user:', error)
          return of('Error fetching user')
        })
      )

  }

  public save(user: User) {
    console.log('user:', user)
    return user._id ? this._updateUser(user) : this._addUser(user)
  }
  
  private _updateUser(user: User) {
    return from(storageService.put<User>(ENTITY, user))
      .pipe(
        tap(updatedUser => {
          const users = this._users$.value
          this._users$.next(users.map(user => user._id === updatedUser._id ? updatedUser : user))
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public saveUser(name: string) {
    let user: Partial<User> = {
      name,
      coins: 100,
      moves: []
    }
    return this._addUser(user as User)
  }

  private _addUser(user: User) {
    return from(storageService.post(ENTITY, user))
      .pipe(
        take(1),
        retry(1),
        catchError(this._handleError)
      )
  }

  public saveLoggedInUser(user: User): void {
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user))
    this.loggedInUserSubject.next(user)
  }

  public getLoggedInUserFromStorage(): User | null {
    const userJSON = localStorage.getItem(LOGGED_IN_USER_KEY)
    return userJSON ? JSON.parse(userJSON) as User : null
  }

  private _createUsers() {
    const users: User[] = [
      {
        _id: '123',
        name: 'Penrose',
        coins: 100,
        moves: []
      },
      {
        _id: '124',
        name: 'Bobo',
        coins: 100,
        moves: []
      },
      {
        _id: '125',
        name: 'Gertrude',
        coins: 100,
        moves: []
      },
      {
        _id: '126',
        name: 'Popovich',
        coins: 100,
        moves: []
      },
    ]
    console.log('this.users:', users)
    return users
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }
}