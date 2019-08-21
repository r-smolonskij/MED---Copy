import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'fields', loadChildren: './fields/fields.module#FieldsPageModule' },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'field/:id', loadChildren: './fields/field-single/field-single.module#FieldSinglePageModule' },
  { path: 'matching-game', loadChildren: './matching-game/matching-game.module#MatchingGamePageModule' },
  { path: 'writing-game', loadChildren: './writing-game/writing-game.module#WritingGamePageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'word-single/:id', loadChildren: './word-single/word-single.module#WordSinglePageModule' },


  {path: '**', redirectTo: 'home'},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
