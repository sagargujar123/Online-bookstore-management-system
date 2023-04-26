import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BookListComponent } from './book-list/book-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { UserlistComponent } from './userlist/userlist.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { BooksComponent } from '../user/books/books.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'userlist', pathMatch: 'full' },
      { path: 'userlist', component: UserlistComponent },
      { path: 'booklist', component: BookListComponent },
      { path: 'orderlist/:id', component: OrderListComponent },
      { path: 'offerlist', component: OfferListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
