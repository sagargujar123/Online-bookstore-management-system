import { Component, OnInit } from '@angular/core';
import { BookListService } from 'src/app/services/book-list.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component'

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [DialogService]
})
export class BookListComponent implements OnInit {
  books!: any;
  totalOrders: any;

  ref!: DynamicDialogRef;

  constructor(
    private bookListService: BookListService,
    private messageService: MessageService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.showBookList();
  }

  showBookList() {
    this.bookListService.getAllBooks().subscribe((response: any) => {
      this.books = response;
      this.totalOrders = this.books.length;
      console.log(response);
    });
  }

  //add book button
  addNewBook() {
    this.ref = this.dialogService.open(AddBookComponent, {
      header: 'Add New Book',
      width: '410px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    
    this.ref.onClose.subscribe(() => {
      this.showBookList();
    });
  }

  // Update book button
  getBookToUpdate(bookId: any) {
    localStorage.setItem('bookId', bookId);
    this.ref = this.dialogService.open(UpdateBookComponent, {
      header: 'Update Book',
      width: '400px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 1000,
    });

    this.ref.onClose.subscribe(() => {
      this.showBookList();
    });
  }

  //Delete book
  deleteBook(bookId: any) {
    this.bookListService.deleteBookById(bookId).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message })
      }
      this.showBookList();
    });
  }
}
