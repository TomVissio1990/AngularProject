import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PagesComponent } from "./pages.component";

//Modules
import { SharedModule } from "../shared/shared.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ChartsModule } from "ng2-charts";

//Services
import { BoosterComponent } from "../components/booster/booster.component";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    BoosterComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component
  ],
  imports: [PagesRoutingModule, SharedModule, FormsModule, ChartsModule]
})
export class PagesModule {}
