import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SidebarService {
  menu: any = [
    {
      id:"123123asdklj",
      title: "Principal",
      icon: "fas fa-fw fa-tachometer-alt",
      submenu: [
        { title :'Profile',url:'/profile'},
        { title :'Dashboard',url:'/dashboard'},
        { title :'ProgressBar',url:'/progress'},
        { title :'Graph',url:'/graph1'},
        { title :'Promises',url:'/promise'},
        { title :'RxJs',url:'/rxjs'}
      ]
    },
    {
      title:'Maintenance ',
      icon:'fas fa-fw fa-wrench',
      submenu:[
        {
          title:'Users', url:'/users',
        },
        {
          title:'Hospitals', url:'/hospitals',
        },
        {
          title:'Doctors', url:'/doctors'
        }
      ]
    }
  ];
  constructor() {}
}
