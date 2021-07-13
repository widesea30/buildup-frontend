import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'toggle-button',
  template: `
    <input type="checkbox" [id]="input_id" [checked]="checked"
      (change)="onChange($event)">
    <label class="toggle-button-switch flex justify-center items-center" [for]="input_id">
      <img height="9" [src]="icon" alt="" />
    </label>
    <div class="toggle-button-text">
      <div class="toggle-button-text-on"></div>
      <div class="toggle-button-text-off"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      width: 144x !important;
      height: 27px;
    }
    
    input[type="checkbox"] {
      display: none; 
    }

    /* circle inside button */
    .toggle-button-switch {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 23px;
      height: 23px;
      background-color: white;
      border-radius: 100%;
      cursor: pointer;
      z-index: 100;
      transition: left 0.3s;
    }

    /* button background */
    .toggle-button-text {
      width: 144x !important;
      height: 27px;
      overflow: hidden;
      background-color: rgba(74, 74, 74, 0.2);
      border-radius: 25px;
      transition: background-color 0.3s;
    }

    /* button text */
    .toggle-button-text-on,
    .toggle-button-text-off {
      float: left;
      width: 50%;
      height: 100%;
      line-height: 50px;
    }

    /* move circle */
    input[type="checkbox"]:checked ~ .toggle-button-switch {
      left: 19px;
    }

    /* reverse background */
    input[type="checkbox"]:checked ~ .toggle-button-text {
      background-color: black;
    }
  `]
})
export class ToggleButtonComponent  {
  @Input() input_id: string;
  @Input() checked: Boolean;
  @Output() changed = new EventEmitter<boolean>();
  icon: string = 'assets/icons/valve-closed.svg';

  onChange($event) {
    if ($event.target.checked) {
      this.icon = 'assets/icons/valve-open.svg';
    } else {
      this.icon = 'assets/icons/valve-closed.svg';
    }
    this.changed.emit($event.target.checked)
  }
}
