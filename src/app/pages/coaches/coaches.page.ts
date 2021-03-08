import { CoachesService } from '../../services/coaches.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coaches',
  templateUrl: 'coaches.page.html',
  styleUrls: ['coaches.page.scss']
})
export class CoachesPage implements OnInit {

  constructor(public service: CoachesService) {}

  ngOnInit() {
    this.service.getCoaches();
  }

}
