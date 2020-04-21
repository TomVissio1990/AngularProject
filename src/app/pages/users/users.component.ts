import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user/user.service";
import _swal from "sweetalert";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styles: []
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  totalUsers: number;
  loading: boolean = true;
  from: number = 0;
  paginationNumber: number = 5;
  showPagination: boolean = true;
  constructor(
    private _userService: UserService,
    private _modalUploaddService: ModalUploadService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this._modalUploaddService.notification.subscribe(resp => this.loadUsers());
  }

  showModal(id: string) {
    this._modalUploaddService.showModal("user", id);
  }

  loadUsers() {
    this.loading = true;
    this._userService.loadUsers(this.from).subscribe((resp: any) => {
      this.loading = false;
      this.totalUsers = resp.totalUsers;
      this.users = resp.users;
    });
  }

  searchUser(search: string) {
    this.loading = true;
    if (search.length <= 0) {
      this.showPagination = true;
      this.loadUsers();
      return;
    }
    this._userService.searchUser(search).subscribe((resp: any) => {
      this.showPagination = false;
      this.loading = false;
      this.users = resp.users;
      this.totalUsers = this.users.length;
    });
  }

  paginationUsers(from: number) {
    this.from = this.from + from;
    this.loadUsers();
  }

  deleteUser(user: User) {
    if (user._id === this._userService.user._id) {
      _swal("Cannot delete user", "Cannot delete self user", "error");
      return;
    }
    _swal({
      title: "Are you sure?",
      text: "You are about to delete user: " + user.name,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this._userService.deleteUser(user._id).subscribe(borrado => {
          this.from = 0;
          this.loadUsers();
        });
      }
    });
  }

  updateUser(user: User) {    
    this._userService.updateUser(user).subscribe();
  }
}
