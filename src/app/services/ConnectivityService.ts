// connectivity.service.ts
import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  constructor() {}

  get isOnline(): Observable<boolean> {
    return fromEvent(window, 'online').pipe(
      startWith(navigator.onLine),
      map(() => navigator.onLine)
    );
  }
}
