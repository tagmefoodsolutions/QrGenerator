import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qr-component',
  templateUrl: './qr-component.component.html',
  styleUrls: ['./qr-component.component.scss']
})
export class QrComponentComponent {

  @Input() qrdata: string = "";
  @Input() color: string = "#333";
  @Input() bgColor: string = "#fff";
  @Output() qrCodeImage: EventEmitter<any> = new EventEmitter();
  public qrCodeDownloadLink: SafeUrl = "";

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
    this.qrCodeImage.emit(url);
  }

}
