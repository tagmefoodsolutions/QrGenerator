import { QrComponentComponent } from './qr-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [QrComponentComponent],
  imports: [
    CommonModule,
    QRCodeModule
  ],
  exports: [QrComponentComponent]
})
export class QrComponentModule { }
