import {CoachesService} from '../../services/coaches.service';
import {Component, OnInit} from '@angular/core';
import {PreferencesService} from "../../services/preferences.service";

@Component({
  selector: 'app-coaches',
  templateUrl: 'coaches.page.html',
  styleUrls: ['coaches.page.scss']
})
export class CoachesPage implements OnInit {
  private timer: any;

  constructor(public service: CoachesService, private preferences: PreferencesService) {
  }

  ngOnInit() {
    this.service.getCoaches();

    if (this.preferences.updatePeriodInSec > 0) {
      this.timer = setInterval(() => {
        this.service.getCoaches();
      }, this.preferences.updatePeriodInSec * 1000);
    }
  }
}
