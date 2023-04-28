import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserListService } from 'src/app/services/user-list.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userId = localStorage.getItem('updateUserId');
  updateUserRole: any;
  responseItem: any;

  constructor(
    private formbuilder: FormBuilder,
    private userListService: UserListService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.getUser();

    this.updateUserRole = this.formbuilder.group({
      name: [''],
      email: [''],
      contactNumber: [''],
      role: ['']
    });
  }

  getUser() {
    this.userListService.getUserByUserId(this.userId).subscribe((response) => {
      this.responseItem = response;
      console.log(response);
      this.setData();
    });
  }

  setData() {
    this.updateUserRole.patchValue({
      name: this.responseItem.name,
      email: this.responseItem.email,
      contactNumber: this.responseItem.contactNumber,
      role: this.responseItem.role
    });
  }

  updateRole() {
    const id = this.responseItem.id;
    const data = this.updateUserRole.value;

    this.userListService.updateUserRole(id, data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.updateUserRole.reset();
        this.dialogRef.close();
      }
    });
  }
}
