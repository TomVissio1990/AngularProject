import { Injectable } from "@angular/core";
import { URL_SERVICE } from "src/app/config/config";

@Injectable({
  providedIn: "root"
})
export class UploadFileService {
  constructor() {}

  uploadFile(file: File, type: string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append("img", file, file.name);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        }
      };
      let url = URL_SERVICE + "/upload/" + type + "/" + id;

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }
}
