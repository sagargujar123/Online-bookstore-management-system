import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateUserComponent } from '../../admin/update-user/update-user.component';
import { UserListService } from 'src/app/services/user-list.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [DialogService]
})
export class UserProfileComponent implements OnInit {
  userId: any;
  userData: any;

  ref!: DynamicDialogRef;

  constructor(
    private userListService: UserListService,
    private dialogService: DialogService,
    private dialogRef:DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.getUser();
  }
  getUser() {
    this.userListService.getUserByUserId(this.userId).subscribe((response: any) => {
      this.userData = response;
      console.log(response);
    });
  }

  showUpdateDialog() {
    this.dialogRef.close();
    localStorage.setItem('updateUserId', this.userId);

    this.ref = this.dialogService.open(UpdateUserComponent, {
      header: 'Update Profile',
      width: '410px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }
}
