import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'search-results',
    loadChildren: () =>
      import('./features/search-results/search-results.module').then((m) => m.SearchResultsModule),
  },
  {
    path: 'add-travel',
    loadChildren: () =>
      import('./features/add-travel/add-travel.module').then((m) => m.AddTravelModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'update-travel/:id',
    loadChildren: () =>
      import('./features/add-travel/add-travel.module').then((m) => m.AddTravelModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'travel-detail/:id',
    loadChildren: () =>
      import('./features/travel-detail/travel-detail.module').then((m) => m.TravelDetailModule),
  },
  {
    path: 'user-profile/:id',
    loadChildren: () =>
      import('./features/user-profile/user-profile.module').then((m) => m.UserProfileModule),
  },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
