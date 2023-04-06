import { ControlValueAccessor } from '@angular/forms';
import { ControlValueAccessorFn } from '@app/model/control-value-accessor-fn';

export class ControlValueAccessorAbstract<T> implements ControlValueAccessor {

  onChange: ControlValueAccessorFn<T> = () => {};
  onTouch: ControlValueAccessorFn<T> = () => {};

  private _value?: T;
  set value(value: T | undefined) {
    this._value = value;
    this.onChange(value);
    this.onTouch(value);
  }
  get value(): T | undefined {
    return this._value;
  }

  registerOnChange(fn: ControlValueAccessorFn<T>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: ControlValueAccessorFn<T>): void {
    this.onTouch = fn;
  }

  writeValue(value: T): void {
    this.value = value;
  }

}
