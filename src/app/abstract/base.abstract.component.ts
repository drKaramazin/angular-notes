import { Injectable, OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject, takeUntil } from 'rxjs';

@Injectable()
export abstract class BaseAbstractComponent implements OnDestroy {

  protected readonly destroy$ = new Subject<void>();

  takeUntilDestroyed<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.destroy$);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
