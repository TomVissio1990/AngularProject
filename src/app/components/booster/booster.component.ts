import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-booster",
  templateUrl: "./booster.component.html",
  styles: []
})
export class BoosterComponent implements OnInit {
  @ViewChild("txtProgress",{static: false}) txtProgress: ElementRef;

  @Input() progress: number = 60;
  @Input() leyend: string = "leyend";

  @Output() changeProgressEvent: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  OnChange() {
    if (this.progress > 100) {
      this.progress = 100;
    }
    if (this.progress < 0 || this.progress == null) {
      this.progress = 0;
    }
    this.changeProgressEvent.emit(this.progress);
  }

  changeProgress(value: number) {
    this.progress = this.progress + value;
    if (this.progress > 100) {
      this.progress = 100;
    }
    if (this.progress < 0) {
      this.progress = 0;
    }

    this.changeProgressEvent.emit(this.progress);

    this.txtProgress.nativeElement.focus();
  }
}
