import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import swal from "sweetalert";
import { UserService } from "../services/user/user.service";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: []
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(public _userService: UserService, public router: Router) {}

  sameField(field1: string, field2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      //return null if validation pass
      if (pass1 === pass2) {
        return null;
      }
      //return like this if validation not pass
      return {
        sameField: true
      };
    };
  }

  ngOnInit() {
    this.form = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        rPassword: new FormControl(null, Validators.required)
      },
      { validators: this.sameField("password", "rPassword") }
    );
  }

  register() {
    if (!this.form.valid) {
      return;
    }

    let user = new User(
      this.form.value.name + " " + this.form.value.lastName,
      this.form.value.email,
      this.form.value.password
    );
    this._userService.createUser(user).subscribe(resp => this.router.navigate(['/login']));
  }
}
