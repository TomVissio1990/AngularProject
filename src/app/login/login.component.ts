import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from "../services/user/user.service";
import { User } from "../models/user.model";
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: []
})
export class LoginComponent implements OnInit {
  auth2: any;
  rememberMe: boolean = false;
  email: string;
  constructor(public router: Router, private _userService: UserService) {}

  ngOnInit() {
    this.googleInit();
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 0) {
      this.rememberMe = true;
    }
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "157986807549-bgbc7emo6u396edm581up15i9mubej3k.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email"
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._userService.loginGoogle(token).subscribe(()=> window.location.href = '#/dashboard');
    });
  }

  login(form: NgForm) {
    //this.router.navigate(['/dashboard']);
    if (!form.valid) {
      return;
    }
    let user = new User(null, form.value.email, form.value.password);
    this._userService
      .login(user, form.value.rememberMe)
      .subscribe(resp => this.router.navigate(["/dashboard"]));
  }
}
