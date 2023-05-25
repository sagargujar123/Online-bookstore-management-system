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
  userId = localStorage.getItem('updateUserId');
  updateUser: any;
  responseItem: any;

  ref!:DynamicDialogRef;

  constructor(
    private formbuilder: FormBuilder,
    private userListService: UserListService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    private dialogService:DialogService
  ) { }

  ngOnInit(): void {
    this.getUser();

    this.updateUser = this.formbuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
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
    const id = this.responseItem.id;
    const data = this.updateUser.value;

    this.userListService.updateUserRole(id, data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.updateUser.reset();
        this.dialogRef.close();
        this.showProfileComponent();
      }
    });
  }

  showProfileComponent(){
    this.ref = this.dialogService.open(UserProfileComponent, {
      header: 'Profile',
      width: '680px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }
}
