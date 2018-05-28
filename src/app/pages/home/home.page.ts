import { Component } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nfc: NFC;
  ndef: Ndef;

  constructor() {
    const theWindow:any = window;
    this.nfc = theWindow.nfc;
    this.ndef = theWindow.ndef;
    if (this.nfc) {
      this.nfc.addNdefListener((nfcEvent: any) => {
        console.log(nfcEvent);
        alert(this.nfc.bytesToHexString(nfcEvent.tag.id));
      });
    }
  }

  public writeTag() {
    if (!this.ndef) {
      alert('This device does not support NFC!');
      return false;
    }
    const message = [
      this.ndef.textRecord("hello, world", null, null),
      this.ndef.uriRecord("http://github.com/chariotsolutions/phonegap-nfc", null)
    ];
    this.nfc.write(message).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }
}
