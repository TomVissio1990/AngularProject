import { Injectable } from "@angular/core";
import { URL_SERVICE } from "src/app/config/config";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/internal/operators/map';
import _swal from "sweetalert";
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: "root",
})
export class HospitalService {
  token: string;

  constructor(public http: HttpClient) {
    this.loadStorage();
  }

  loadStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
    } else {
      this.token = "";
    }
  }

  loadHospitals() {
    let url = URL_SERVICE + "/hospital";
    return this.http.get(url);
  }

  createHospital(name: string) {
    let url = URL_SERVICE + "/hospital?token=" + this.token;
    return this.http.post(url, { name: name });
  }

  deleteHospital(id: string) {
    let url = URL_SERVICE + "/hospital/"+id+"?token=" + this.token;
    return this.http.delete(url).pipe(
      map(resp => {
        _swal("Hospital deleted", "success");
        return true;
      })
    );
  }
  
  updateHospital(hospital: Hospital) {
    let url = URL_SERVICE + "/hospital/" + hospital._id;
    url += "?token=" + this.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        _swal("User update", hospital.name, "success");
        return true;
      })
    );
  }

  searchHospital(search: string) {
    let url = URL_SERVICE + "/search/hospital/" + search;
    return this.http.get(url);
  }
}
