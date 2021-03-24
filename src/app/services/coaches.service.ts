import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Coach} from '../models/coach';
import {LoadingController} from "@ionic/angular";
import {PreferencesService} from "./preferences.service";

@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  public coachesOnPage: Coach[];

  public itemCount: number;
  public pages: number;
  public pageNumbers = [];
  public selectedItem: number;

  private coaches: Coach[];

  constructor(
    private api: ApiService,
    private preferences: PreferencesService,
    private loadingController: LoadingController,
  ) {
  }

  async getCoaches() {
    let loader = await this.loadingController.create();
    await loader.present();

    this.api.getCoaches().subscribe(coaches => {
      this.coaches = coaches.data;
      this.itemCount = coaches.count;
      this.pages = Math.ceil(coaches.count / this.preferences.pageSize);
      this.pageNumbers = [...Array(this.pages).keys()]
      this.toPage(0);

      loader.dismiss();
    }, error => {
      loader.dismiss();
      throw error;
    });
  }

  toPage(page: number) {
    this.selectedItem = page;

    const from = page * this.preferences.pageSize;
    const to = (page + 1) * this.preferences.pageSize;

    this.coachesOnPage = this.coaches.slice(from, to >= this.itemCount ? this.itemCount : to)
  }
}
