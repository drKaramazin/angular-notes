import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _needsToAddNote = new BehaviorSubject(false);

  constructor() { }

  needsToAddNote() {
    this._needsToAddNote.next(true);
  }

  isAddingNote(): BehaviorSubject<boolean> {
    return this._needsToAddNote;
  }
}
