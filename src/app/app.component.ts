import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from "@ionic/angular";
import {AuthService} from "./services/auth.service";
import {PreferencesService} from "./services/preferences.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private preferences: PreferencesService,
  ) {
    this.translate.setDefaultLang("en");
  }

  ngOnInit(): void {
    this.translate.use(this.preferences.forcedLanguage);
  }
}
