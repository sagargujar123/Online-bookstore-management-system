import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookListService } from 'src/app/services/book-list.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  addBookForm: any;

  constructor(
    private formbuilder: FormBuilder,
    private bookListService: BookListService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.addBookForm = this.formbuilder.group({
      bookName: new FormControl('',[Validators.required]),
      imageUrl: new FormControl('',[Validators.required]),
      bookDetail: new FormControl('',[Validators.required]),
      author: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      availableQuantity: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
    });
  }

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
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.addBookForm.reset();
        this.dialogRef.close();
      }
    });
  }
}
