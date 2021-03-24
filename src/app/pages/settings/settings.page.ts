import {Component, OnInit} from '@angular/core';
import {PreferencesService} from "../../services/preferences.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public preferences: PreferencesService) {
  }

  ngOnInit() {
  }

  updatePageSize(event: any) {
    this.preferences.pageSize = event.target.value;
  }

  updateLanguage(event: any) {
    this.preferences.forcedLanguage = event.target.value;
  }

  updateUpdatePeriod(event: any) {
    this.preferences.updatePeriodInSec = event.target.value;
  }
}
