import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  constructor() { 
      // Initialization inside the constructor
      this.message = "";
  }
  onClose() {
    this.close.emit();
  }
}
