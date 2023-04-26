import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BookListService } from 'src/app/services/book-list.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  bookId = localStorage.getItem('bookId');
  updateBookForm: any;
  responseItem: any;

  constructor(
    private bookListService: BookListService,
    private formbuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getBook();

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

  getBook() {
    this.bookListService.getBookById(this.bookId).subscribe((response: any) => {
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
    const bookId = this.bookId;
    const data = this.updateBookForm.value;

    this.bookListService.updateBookById(bookId, data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 201) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
      }
      this.updateBookForm.reset();
    });
  }
}
