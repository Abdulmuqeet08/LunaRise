import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    OnInit,
    Output,
  } from '@angular/core';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
  
  @Component({
    selector: 'app-iframe-dialog',
    templateUrl: './iframe-dialog.component.html',
  })
  export class IframeDialogComponent implements OnInit {
    url: string = 'http://test.mvbr-ei-amarseva.in/home';
    urlMap: SafeResourceUrl | undefined;
    tabIndex: number = 0;
    constructor(
      private _mdr: MatDialogRef<IframeDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: any,
      public sanitizer: DomSanitizer,
      private cdr: ChangeDetectorRef
    ) {
      this.tabIndex = data?.tabIndex;
      this.url=data?.url;
    }
    CloseDialog() {
      this.tabIndex = this.tabIndex + 1;
      this._mdr.close({
        data: {
          tabIndex: this.tabIndex,
          modelClose: true,
        },
      });
    }
    getIndex(tabIndex: any) {
      this.tabIndex = tabIndex;
      tabIndex = this.tabIndex + 1;
      return tabIndex;
    }
  
    ngOnInit() {
      this.urlMap = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }
  