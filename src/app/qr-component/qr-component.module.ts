import { QrComponentComponent } from './qr-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';

@NgModule({
  declarations: [QrComponentComponent],
  imports: [
    CommonModule,
    QRCodeModule,
    NgxQrcodeStylingModule
  ],
  exports: [QrComponentComponent]
})
export class QrComponentModule { }
