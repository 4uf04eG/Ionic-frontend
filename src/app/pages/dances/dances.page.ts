import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {QueryList} from "../../models/query-list";
import {Dance} from "../../models/dance";
import {LoadingController} from "@ionic/angular";
import {PreferencesService} from "../../services/preferences.service";

@Component({
  selector: 'app-dances',
  templateUrl: 'dances.page.html',
  styleUrls: ['dances.page.scss']
})
export class DancesPage implements OnInit {
  public dances: QueryList<Dance>;
  public error: any;

  public rows = [];
  public editing = {};

  private timer: any;

  constructor(
    public preferences: PreferencesService,
    private api: ApiService,
    private loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    this.getDances();

    if (this.preferences.updatePeriodInSec > 0) {
      this.timer = setInterval(() => {
        this.getDances();
      }, this.preferences.updatePeriodInSec * 1000)
    }
  }

  async getDances() {
    let loader = await this.loadingController.create()
    await loader.present()

    this.api.getDances().subscribe(dance => {
      this.dances = dance;
      this.rows = dance.data.map((it, index) =>
        ({id: index + 1, name: it.name, realId: it.id}));
      loader.dismiss();
    }, error => {
      this.error = error;
      loader.dismiss();
      throw error;
    })
  }

  updateValue(event, cell, rowIndex) {
    this.rows[rowIndex][cell] = event instanceof Date ? event : event.target.value;
    this.rows = [...this.rows];

    let newDance = {...this.rows[rowIndex]};
    newDance['id'] = this.rows[rowIndex].realId
    this.api.updateDance(newDance).subscribe();
  }
}
