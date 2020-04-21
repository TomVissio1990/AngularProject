import { Component, OnInit } from "@angular/core";
import { Hospital } from "src/app/models/hospital.model";
import { HospitalService } from "src/app/services/hospital/hospital.service";
import _swal from "sweetalert";
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: "app-hospitals",
  templateUrl: "./hospitals.component.html",
  styles: [],
})
export class HospitalsComponent implements OnInit {
  hospitals: Hospital[] = [];
  totalHospitals: number;
  loading: boolean = true;
  constructor(private _hospitalService: HospitalService, private _modalUploaddService:ModalUploadService) {}

  ngOnInit() {
    this.loadHospitals();
    this._modalUploaddService.notification.subscribe(resp => this.loadHospitals());
  }

  showModal(id: string) {
    this._modalUploaddService.showModal("hospital", id);
  }

  loadHospitals() {
    this.loading = true;
    this._hospitalService.loadHospitals().subscribe((resp: any) => {
      this.loading = false;
      this.totalHospitals = resp.totalHospitals;
      this.hospitals = resp.hospitals;
    });
  }

  createHospital() {
    _swal({
      title: "Create Hospital",
      text: "Enter the name of the hospital to be created",
      content: {
        element: "input",
        attributes: {
          placeholder: "Hospital name",
        },
      },
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((value) => {
      if (!value) {
        _swal({
          text: "Name cannot be empty",
          dangerMode: true,
          icon: "warning",
        });
      } else {
        this._hospitalService.createHospital(value).subscribe((resp:any)=>{
          this.loadHospitals();
        })
      }
    });
  }

  deleteHospital(hospital:Hospital){
    _swal({
      title: "Are you sure?",
      text: "You are about to delete hospital: " + hospital.name,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this._hospitalService.deleteHospital(hospital._id).subscribe( deleted => {          
          this.loadHospitals();
        });
      }
    });
  }

  updateHospital(hospital:Hospital){
    this._hospitalService.updateHospital(hospital).subscribe();
  }

  searchHospital(search:string){
    this.loading = true;
    if (search.length <= 0) {      
      this.loadHospitals();
      return;
    }
    this._hospitalService.searchHospital(search).subscribe((resp: any) => {      
      this.loading = false;
      this.hospitals = resp.hospitals;
      this.totalHospitals = this.hospitals.length;
    });
  }
}
