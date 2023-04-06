import { Component } from '@angular/core';
import { ControlValueAccessorAbstract } from '@app/abstract/control-value-accessor';
import { environment } from '@env/environment';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ZoomComponent,
    multi: true,
  }]
})
export class ZoomComponent extends ControlValueAccessorAbstract<number> {

  constructor() {
    super();
    this.value = environment.zoom.default;
  }

  inputValue(event: any) {
    const value = event.target.value;

    this.value = value >= environment.zoom.min && value <= environment.zoom.max ? this.value = value : environment.zoom.default;
  }

  plus() {
    const value = this.value ? this.value + environment.zoom.step : environment.zoom.max;
    if (value <= environment.zoom.max) {
      this.value = value;
    }
  }

  minus() {
    const value = this.value ? this.value - environment.zoom.step : environment.zoom.min;
    if (value >= environment.zoom.min) {
      this.value = value;
    }
  }

}
