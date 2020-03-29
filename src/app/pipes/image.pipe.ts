import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICE } from "../config/config";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "image"
})
export class ImagePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}
  transform(img: string, tipo: string = "user"): any {
    let url = URL_SERVICE + "/img";

    if (!img) {
      return url + "/user/x";
    }

    if (img.indexOf("https") >= 0) {
      return this._sanitizer.bypassSecurityTrustUrl(img);
    }

    switch (tipo) {
      case "user":
        url += "/user/" + img;
        break;
      case "hospital":
        url += "/hospital/" + img;
        break;
      case "doctor":
        url += "/doctor/" + img;
        break;
      default:
        url += "/user/x";
    }
    return url;
  }
}
