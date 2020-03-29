import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "auth"
})
export class AuthPipe implements PipeTransform {
  transform(value: any): any {
    if (value === true) {
      return "Google";
    }

    return "Local";
  }
}
