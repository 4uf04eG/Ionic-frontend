import { CoachesService } from './../../services/coaches.service';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoachesPage } from './coaches.page';
import { CoachesPageRoutingModule } from './coaches-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    CoachesPageRoutingModule
  ],
  declarations: [CoachesPage],
})
export class CoachesPageModule {}
