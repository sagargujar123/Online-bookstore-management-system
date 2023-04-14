import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserListService } from 'src/app/services/user-list.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: any;
  visible!: boolean;
  updateUserRole!: FormGroup;
  responseItem: any;
  totalOrders: any;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private userListService: UserListService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.showUserList();

    this.updateUserRole = this.formbuilder.group({
      name: [''],
      email: [''],
      contactNumber: [''],
      role: ['']
    });
  }

  showUserList() {
    this.userListService.getAllUsers().subscribe((response: any) => {
      this.users = response;
      this.totalOrders = this.users.length;
      console.log(response);
    });
  }

  showUpdateForm(userId: any) {
    this.visible = true;
    this.userListService.getUserByUserId(userId).subscribe((response) => {
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
        this.visible = false;
        this.showUserList();
      }
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
