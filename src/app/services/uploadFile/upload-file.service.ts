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
            console.log("upload img");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("fail upload img");
            reject(JSON.parse(xhr.response));
          }
        }
      };
      let url = URL_SERVICE + "/upload/" + type + "/" + id;
      console.log(url);

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }
}
