import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private _userService: UserService,
    private router:Router) {}

  canActivate(): boolean {
    if (this._userService.isLogin()){
      return true
    }else{
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
