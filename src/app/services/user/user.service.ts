import { Injectable } from "@angular/core";
import { User } from "src/app/models/user.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICE } from "src/app/config/config";
import { map } from "rxjs/operators";
import swal from "sweetalert";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(public http: HttpClient, private _router: Router) {
    this.loadStorage();
    console.log("Service OK");
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
    
    this._router.navigate(['/login'])
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
        swal("User created");
        return resp.user;
      })
    );
  }
}
