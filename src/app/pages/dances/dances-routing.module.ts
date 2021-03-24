import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DancesPage} from './Dances.page';

const routes: Routes = [
  {
    path: '',
    component: DancesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DancesPageRoutingModule {
}
