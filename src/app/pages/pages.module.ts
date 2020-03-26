import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PagesComponent } from "./pages.component";

//Modules
import { SharedModule } from "../shared/shared.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ChartsModule } from "ng2-charts";
import { PipesModule } from "../pipes/pipes.module";

//Services
import { BoosterComponent } from "../components/booster/booster.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    BoosterComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule
  ]
})
export class PagesModule {}
