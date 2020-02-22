import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SidebarService {
  menu: any = [
    {
      id:"123123asdklj",
      titulo: "Principal",
      icono: "fas fa-fw fa-tachometer-alt",
      submenu: [
        { titulo :'Dashboard',url:'/dashboard'},
        { titulo :'ProgressBar',url:'/progress'},
        { titulo :'Graph',url:'/graph1'},
        { titulo :'Promises',url:'/promise'},
        { titulo :'RxJs',url:'/rxjs'}
      ]
    }
  ];
  constructor() {}
}
