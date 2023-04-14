import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookListService } from 'src/app/services/book-list.service';
import { MessageService } from 'primeng/api';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { UpdateBookComponent } from '../update-book/update-book.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books!: any;
  visible!: boolean;
  isVisible!: boolean;
  addBookForm!: FormGroup;
  updateBookForm!: FormGroup;
  id: any;
  responseItem: any;
  loading!: boolean;
  totalOrders: any;

  // ref!:DynamicDialogRef;


  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private bookListService: BookListService,
    private messageService: MessageService,
    // public dialogService:DialogService
  ) { }

  ngOnInit(): void {
    this.showBookList();

    //add book form
    this.addBookForm = this.formbuilder.group({
      bookName: [''],
      imageUrl: [''],
      bookDetail: [''],
      author: [''],
      price: [''],
      availableQuantity: [''],
      status: ['']
    });

    //update book form
    this.updateBookForm = this.formbuilder.group({
      id: [''],
      bookName: [''],
      imageUrl: [''],
      bookDetail: [''],
      author: [''],
      price: [''],
      availableQuantity: [''],
      status: ['']
    });
  }

  showBookList() {
    this.loading = true;
    this.bookListService.getAllBooks().subscribe((response: any) => {
      this.books = response;
      this.totalOrders = response.length;
      console.log(response);
      this.loading = false;
    });
  }

  //add book button
  addNewBook() {
    this.visible = true;
    // this.ref=this.dialogService.open(UpdateBookComponent,{
    //   header:'Update Book',
    //   width:'70%',
    //   contentStyle:{ overflow: 'auto'},
    //   baseZIndex:10000,
    //   maximizable:true
    // });
  }

  //change available status
  addStatus(value: any) {
    if (value <= 0) {
      this.addBookForm.patchValue({
        status: 'Not Available'
      });
    } else {
      this.addBookForm.patchValue({
        status: 'Available'
      });
    }
  }

  addBookToBookList() {
    var data = this.addBookForm.value;
    this.bookListService.addBook(data).subscribe((response: any) => {
      console.log(response);

      if (response.statusCode === 201) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message })
      }
      this.addBookForm.reset();
      this.visible = false;
      this.showBookList();
    });
  }

  // Update book code
  // Update book button
  getBookToUpdate(bookId: any) {
    this.isVisible = true;
    this.id = bookId;
    this.bookListService.getBookById(bookId).subscribe((response: any) => {
      this.responseItem = response;
      console.log(response);
      this.setBookData();
    });
  }

  setBookData() {
    this.updateBookForm.patchValue({
      id: this.responseItem.id,
      bookName: this.responseItem.bookName,
      imageUrl: this.responseItem.imageUrl,
      bookDetail: this.responseItem.bookDetail,
      author: this.responseItem.author,
      price: this.responseItem.price,
      availableQuantity: this.responseItem.availableQuantity,
      status: this.responseItem.status
    });
  }

  //change available status
  changeStatus(value: any) {
    if (value <= 0) {
      this.updateBookForm.patchValue({
        status: 'Not Available'
      });
    } else {
      this.updateBookForm.patchValue({
        status: 'Available'
      });
    }
  }

  updateBook() {
    const bookId = this.id;
    const data = this.updateBookForm.value;

    this.bookListService.updateBookById(bookId, data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 201) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
      }
      this.updateBookForm.reset();
      this.isVisible = false;
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
