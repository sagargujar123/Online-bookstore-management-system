import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BookListComponent } from './book-list/book-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'userlist', component: UserlistComponent },
      { path: 'booklist', component: BookListComponent },
      { path: 'orderlist/:id', component: OrderListComponent },
      { path: '', redirectTo: 'userlist', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
