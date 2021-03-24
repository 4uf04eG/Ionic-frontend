import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {LoadingController} from "@ionic/angular";
import {PreferencesService} from "../../services/preferences.service";
import {QueryList} from "../../models/query-list";
import {Group} from "../../models/group";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  public groups: QueryList<Group>;
  public error: any;

  public rows = []
  public editing = {};

  private timer: any;

  constructor(
    public preferences: PreferencesService,
    private api: ApiService,
    private loadingController: LoadingController) {
  }


  ngOnInit() {
    this.getGroups();

    if (this.preferences.updatePeriodInSec > 0) {
      this.timer = setInterval(() => {
        this.getGroups();
      }, this.preferences.updatePeriodInSec * 1000);
    }
  }

  async getGroups() {
    let loader = await this.loadingController.create()
    await loader.present()

    this.api.getGroups().subscribe(groups => {
      this.groups = groups;
      this.rows = groups.data.map((it, index) => ({
        id: index + 1,
        name: it.name,
        creationDate: it.creation_date,
        coach: it.coach.last_name,
        realId: it.id,
      }));
      loader.dismiss();
    }, error => {
      this.error = error;
      loader.dismiss();
      throw error;
    });
  }

  updateValue(event, cell, rowIndex) {
    this.rows[rowIndex][cell] = event instanceof Date ? event : event.target.value;
    this.rows = [...this.rows];

    let newGroup = {...this.rows[rowIndex]};
    newGroup['id'] = this.rows[rowIndex].realId
    this.api.updateGroup(newGroup).subscribe();
  }
}
