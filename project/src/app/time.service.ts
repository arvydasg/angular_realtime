/**
 * A service that provides an observable stream of the current time.
 *
 * This service uses the RxJS library to create an observable that emits the current time
 * every second. The `interval` function is used to create an observable that emits a value
 * every specified interval (in this case, every second). The `map` operator is used to
 * transform the emitted value (which is a number representing the number of seconds since
 * the start of the interval) into a `Date` object representing the current time.
 */
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * A service that provides an observable stream of the current time.
 */
@Injectable({
  providedIn: 'root'
})
export class TimeService {

  /*
   * Returns an observable stream of the current time.
  */
  getTime(): Observable<Date> {
    return interval(1000).pipe(map(() => new Date()));
  }
}
