import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxQrcodeStylingComponent } from 'ngx-qrcode-styling';

@Component({
  selector: 'app-qr-component',
  templateUrl: './qr-component.component.html',
  styleUrls: ['./qr-component.component.scss']
})
export class QrComponentComponent {
  @Input() qrdata: string = '';
  @Input() color: string = '#333';
  @Input() bgColor: string = '#fff';
  @Output() qrCodeImage: EventEmitter<any> = new EventEmitter();
  public qrCodeDownloadLink: SafeUrl = '';
  public blobURL: SafeUrl = '';

  constructor(private elRef:ElementRef, private domSanitizer: DomSanitizer) { }

  ngOnChanges(changes: any) {
    if (changes.qrdata) {
      this.onChangeURL(changes.qrdata.currentValue);
      console.log(changes.qrdata.currentValue);
    }
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
    this.qrCodeImage.emit(url);
    console.log('loaded')
  }

  @ViewChild('qrcode', { static: false })
  public qrcode!: NgxQrcodeStylingComponent;

  getQrBlob() {
    const data = new XMLSerializer().serializeToString(this.elRef.nativeElement.querySelector('svg'));
    const blob = new Blob([data], { type: 'image/svg+xml' });
    const URL = window.URL || window.webkitURL || window;
    this.blobURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));

    console.log(this.blobURL);
  }
}
