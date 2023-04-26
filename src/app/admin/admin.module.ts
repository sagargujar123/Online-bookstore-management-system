import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material/material.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserlistComponent } from './userlist/userlist.component';
import { OrderListComponent } from './order-list/order-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AddBookComponent } from './add-book/add-book.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { UpdateOfferComponent } from './update-offer/update-offer.component';
import { UpdateUserComponent } from './update-user/update-user.component'

@NgModule({
  declarations: [
    AdminComponent,
    UserlistComponent,
    OrderListComponent,
    BookListComponent,
    HeaderComponent,
    AddBookComponent,
    OfferListComponent,
    UpdateBookComponent,
    AddOfferComponent,
    UpdateOfferComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
