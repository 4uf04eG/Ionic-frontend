import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

export const RootPaths = {
  login: 'login',
  registration: 'registration',
  main: 'main',
  all: ''
};

const routes: Routes = [
  {
    path: RootPaths.login,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: RootPaths.main,
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: RootPaths.registration,
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: RootPaths.all,
    redirectTo: '/' + RootPaths.login,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
