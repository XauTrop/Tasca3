import { Component, OnInit } from '@angular/core';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Pla3';
  public langObject: any;

  constructor(private _languageService: LangService) {

  }
  ngOnInit(): void {
    this.langObject = this._languageService.langObject();

  }
}
