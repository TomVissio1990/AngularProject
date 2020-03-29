import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { User } from "src/app/models/user.model";
import _swal from "sweetalert";
import { read } from 'fs';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
  user: User;
  imgUpload: File;
  tempImg: any;
  constructor(private _userService: UserService) {}

  ngOnInit() {
    this.user = this._userService.user;
  }

  saveUser(user: User) {
    this.user.name = user.name;
    if (!this.user.google) {
      this.user.email = user.email;
    }
    this._userService.updateUser(this.user).subscribe();
  }

  selectImage(file: File) {
    if (!file) {
      this.imgUpload = null;
      return;
    }
    if (file.type.indexOf("image") < 0) {
      _swal('Only Images','File must be an image','error');
      this.imgUpload = null;
      return;
    }

    this.imgUpload = file;

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(file);

    reader.onloadend = () => this.tempImg = reader.result;

  }

  changeImg() {
    this._userService.updateImg(this.imgUpload, this.user._id);
  }
}
