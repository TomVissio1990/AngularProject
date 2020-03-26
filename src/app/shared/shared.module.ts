import { NgModule } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  imports:[
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    NopagefoundComponent
  ],
  exports: [      
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    NopagefoundComponent
  ]
})
export class SharedModule {}