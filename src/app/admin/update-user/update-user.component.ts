import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserListService } from 'src/app/services/user-list.service';
import { UserProfileComponent } from '../../user/user-profile/user-profile.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userId: any;
  updateUser: any;
  responseItem: any;
  enableReadOnly = false;
  userRole: any;

  ref!: DynamicDialogRef;

  constructor(
    private formbuilder: FormBuilder,
    private userListService: UserListService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('updateUserId');
    this.userRole = localStorage.getItem('userRole');
    this.getUser();

    this.updateUser = this.formbuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('[7-9]{1}[0-9]{9}')]),
      role: new FormControl('', [Validators.required]),
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
    this.updateUser.patchValue({
      name: this.responseItem.name,
      email: this.responseItem.email,
      contactNumber: this.responseItem.contactNumber,
      role: this.responseItem.role
    });
  }

  updateUserProfile() {
    if (this.updateUser.invalid) {
      this.updateUser.markAllAsTouched();
      return;
    }
    const id = this.responseItem.id;
    const data = this.updateUser.value;

    this.userListService.updateUserRole(id, data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        localStorage.setItem('userId', id);
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.updateUser.reset();
        this.dialogRef.close();
        this.showProfileComponent();
      }
    });
  }

  showProfileComponent() {
    this.ref = this.dialogService.open(UserProfileComponent, {
      header: 'Profile',
      width: '680px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }
}
