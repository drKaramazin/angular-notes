import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private _deleting = new Subject<void>();

  deleting(): Observable<void> {
    return this._deleting.asObservable();
  }

  delete() {
    this._deleting.next();
  }

}
