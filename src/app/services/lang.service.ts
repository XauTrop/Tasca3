import { Injectable } from '@angular/core';

import { CustomMessages } from 'src/assets/lang/lang' ;
import { LangModel } from '../models/lang.model';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  
  private defaultLang: string = 'en';
  private errorMsgs: any  = CustomMessages;
  private targetLang: LangModel;
  private langBrowser: string = navigator.languages ? navigator.languages[0] : this.defaultLang;
  constructor() { }

  langObject(): object {
    this.targetLang = this.errorMsgs[this.langBrowser]

    if (!this.targetLang){
      return (this.errorMsgs[this.defaultLang]);
    } else {
      return this.targetLang;
    }
  }

}
