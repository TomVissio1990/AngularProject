import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ProgressComponent } from "./pages/progress/progress.component";
import { Graph1Component } from "./pages/graph1/graph1.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { PagesComponent } from "./pages/pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "progress", component: ProgressComponent },
      { path: "graph1", component: Graph1Component },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  // { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "**", component: NopagefoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
