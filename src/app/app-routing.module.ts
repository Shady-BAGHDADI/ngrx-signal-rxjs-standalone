import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TodoComponent,
    children: [
      /*
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'products',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./products/product.module').then((m) => m.ProductModule),
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      
      */
    ],
  },
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
