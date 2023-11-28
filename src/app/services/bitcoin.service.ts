import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

const ENTITY = 'coins'

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) {
    const coins = JSON.parse(localStorage.getItem(ENTITY) || 'null')
  }

  getRate(coins: number): Observable<string> {
    const apiUrl = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    console.log('API URL:', apiUrl)
    return this.http.get<number>(apiUrl).pipe(
      tap((res) => console.log('API Response:', res)),
      map((res: number) => {
        if (res !== null && !isNaN(res)) {
          return res.toString()
        } else {
          throw new Error('Invalid API Response: Unexpected structure or empty response')
        }
      }),
      catchError(this._handleError)
    )
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }
}
