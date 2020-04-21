import { Component, OnInit } from "@angular/core";
import _swal from "sweetalert";
import { UploadFileService } from "src/app/services/uploadFile/upload-file.service";
import { ModalUploadService } from "./modal-upload.service";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imgUpload: File;
  tempImg: any;
  constructor(
    private _uploadFile: UploadFileService,
    private _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  selectImage(file: File) {
    if (!file) {
      this.imgUpload = null;
      return;
    }
    if (file.type.indexOf("image") < 0) {
      _swal("Only Images", "File must be an image", "error");
      this.imgUpload = null;
      return;
    }

    this.imgUpload = file;

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(file);

    reader.onloadend = () => (this.tempImg = reader.result);
  }

  hideModal() {
    this.tempImg = null;
    this.imgUpload = null;

    this._modalUploadService.hideModal();
  }

  uploadImg() {
    console.log(this._modalUploadService.type)
    this._uploadFile
      .uploadFile(
        this.imgUpload,
        this._modalUploadService.type,
        this._modalUploadService.id
      )
      .then(resp => {
        this._modalUploadService.notification.emit(resp);
        this.hideModal();
      })
      .catch(err => {
        console.log("Error uploading img");
      });
  }
}
