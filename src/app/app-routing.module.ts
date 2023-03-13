import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'signup', component: UserSignupComponent },
  { path: 'books', component:BooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
