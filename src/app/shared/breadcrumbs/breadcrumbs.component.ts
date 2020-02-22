import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Title, Meta, MetaDefinition } from "@angular/platform-browser";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  label: string = "";
  constructor(private router: Router, public title: Title, public meta: Meta) {
    this.getDataRouter().subscribe(data => {
      this.label = data.title;
      this.title.setTitle(data.title);
      let metaTag: MetaDefinition = {
        name: 'description',
        content: this.label
      };
      this.meta.updateTag(metaTag)
    });
  }

  getDataRouter() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
  ngOnInit() {}
}
