import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  url = 'https://livemenu.app/menu/56c776ff0896b3cd13c6012b';
  start: number = 1;
  end: number = 14;
  tablesInterval!: Array<any>;
  title = 'qrs';

  color = '#333333';
  bgColor = '#ffffff';

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.updateTableInterval();
  }

  updateTableInterval() {
    this.tablesInterval = [];

    for (let i = this.start; i <= this.end; i++) {
      this.tablesInterval.push({
        table: i
      });
    }

    return this.tablesInterval;
  }

  updateQrBlob(table: number, blob: any) {
    this.tablesInterval.find(x => x.table === table).blob = blob;
  }

  downloadAsZip(): void {
    let count = 0;
    const zip = new JSZip();

    this.tablesInterval.forEach(({table, blob: url}) => {
      const filename = `mesa-${table}.svg`;

      JSZipUtils.getBinaryContent(url.changingThisBreaksApplicationSecurity, (err: any, data: any) => {
        if (err) {
          throw err;
        }

        zip.file(filename, data, {binary: true});
        count++;

        if (count === this.tablesInterval.length) {
          zip.generateAsync({type: 'blob'}).then((content) => {
            const objectUrl: string = URL.createObjectURL(content);
            const link: any = document.createElement('a');

            link.download = 'qrcodes.zip';
            link.href = objectUrl;
            link.click();
          });
        }
      });
    });
  }
}
