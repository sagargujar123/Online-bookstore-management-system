import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.getBook();

    this.updateBookForm = this.formbuilder.group({
      id: [''],
      bookName: new FormControl('',[Validators.required]),
      imageUrl: new FormControl('',[Validators.required]),
      bookDetail: new FormControl('',[Validators.required]),
      author: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      availableQuantity: new FormControl('',[Validators.required]),
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
    if(this.updateBookForm.invalid){
      this.updateBookForm.markAllAsTouched();
      return;
    }
    const bookId = this.bookId;
    const data = this.updateBookForm.value;

    this.bookListService.updateBookById(bookId, data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 201) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.updateBookForm.reset();
        this.dialogRef.close();
      }
    });
  }
}


