import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/guards/login-guard.guard';

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate:[LoginGuard],
    children: [
      { path: "dashboard", component: DashboardComponent, data:{ title:"Dashboard" } },
      { path: "progress", component: ProgressComponent, data:{ title:"Progress Bars" } },
      { path: "graph1", component: Graph1Component, data:{ title:"Graphs" } },
      { path: "promise", component: PromesasComponent, data:{ title:"Promise" } },
      { path: "rxjs", component: RxjsComponent, data:{ title:"RxJs" } },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
