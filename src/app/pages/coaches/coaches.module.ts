import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CoachesPage} from './coaches.page';
import {CoachesPageRoutingModule} from './coaches-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    CoachesPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [CoachesPage],
})
export class CoachesPageModule {
}
