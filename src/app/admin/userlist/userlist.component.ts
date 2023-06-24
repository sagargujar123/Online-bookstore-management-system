import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserListService } from 'src/app/services/user-list.service';
import { UpdateUserComponent } from '../update-user/update-user.component'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [DialogService]
})
export class UserlistComponent implements OnInit {
  users: any;
  totalOrders: any;

  ref!: DynamicDialogRef;

  constructor(
    private userListService: UserListService,
    public dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.showUserList();
  }

  showUserList() {
    this.userListService.getAllUsers().subscribe((response: any) => {
      this.users = response;
      this.totalOrders = this.users.length;
      console.log(response);
    });
  }

  showUpdateForm(userId: any) {
    localStorage.setItem('updateUserId', userId);
    
    this.ref = this.dialogService.open(UpdateUserComponent, {
      header: 'Update User',
      width: '410px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 1000,
    });

    this.ref.onClose.subscribe(() => {
      this.showUserList();
    });
  }

  deleteUser(userId: any) {
    this.userListService.deleteUserByUserId(userId).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.showUserList();
      }
    });
  }
}
