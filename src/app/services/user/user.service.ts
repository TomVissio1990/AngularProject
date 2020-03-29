import { Injectable } from "@angular/core";
import { User } from "src/app/models/user.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICE } from "src/app/config/config";
import { map } from "rxjs/operators";
import _swal from "sweetalert";
import { Router } from "@angular/router";
import { UploadFileService } from "../uploadFile/upload-file.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    public http: HttpClient,
    private _router: Router,
    private _uploadFile: UploadFileService
  ) {
    this.loadStorage();
  }
  user: User;
  token: string;

  isLogin() {
    return this.token.length > 5 ? true : false;
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loadStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.token = "";
      this.user = null;
    }
  }

  logout() {
    this.user = null;
    this.token = "";

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");

    this._router.navigate(["/login"]);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICE + "/login/google";
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user);
        return true;
      })
    );
  }

  login(user: User, rememberMe: Boolean = false) {
    if (rememberMe) {
      localStorage.setItem("email", user.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICE + "/login";
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user);
        return true;
      })
    );
  }

  createUser(user: User) {
    let url = URL_SERVICE + "/user";
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        _swal("User created");
        return resp.user;
      })
    );
  }

  updateUser(user: User) {
    let url = URL_SERVICE + "/user/" + user._id;
    url += "?token=" + this.token;
    return this.http.put(url, user).pipe(
      map((resp: any) => {
        if (user._id === this.user._id) {
          let userDB: User = resp.user;
          this.saveStorage(userDB._id, this.token, userDB);
        }
        _swal("User update", user.name, "success");
        return true;
      })
    );
  }

  updateImg(file: File, id: string) {
    this._uploadFile
      .uploadFile(file, "user", id)
      .then((resp: any) => {
        this.user.img = resp.user.img;
        _swal("Image updated", this.user.name, "success");
        this.saveStorage(id, this.token, this.user);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  loadUsers(from: number) {
    let url = URL_SERVICE + "/user?from=" + from;
    return this.http.get(url);
  }

  searchUser(search: string) {
    let url = URL_SERVICE + "/search/user/" + search;
    return this.http.get(url);
  }

  deleteUser(id: string) {
    let url = URL_SERVICE + "/User/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).pipe(
      map(resp => {
        _swal("User deleted", "success");
        return true;
      })
    );
  }
}
