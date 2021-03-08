import { CoachesPageModule } from './../pages/coaches/coaches.module';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Coach } from '../models/coach';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  public coaches: Coach[];
  public count: number


  constructor(private api: ApiService) { }

  getCoaches() {
    this.api.getCoaches().subscribe(coaches => {
      this.coaches = coaches.data;
      this.count = coaches.count;
    });
  }
}
