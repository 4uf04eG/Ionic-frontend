import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DancesPage} from './Dances.page';
import {DancesPageRoutingModule} from './dances-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    DancesPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [DancesPage]
})
export class DancesPageModule {
}
