import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit {
  subscription: Subscription;

  constructor() {
    this.subscription = this.returnObs().subscribe(
      numero => console.log("Subs", numero),
      error => console.error("Error: ", error),
      () => console.log("el observador termino")
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  returnObs(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador = contador + 1;
        let salida = {
          valor: contador
        };
        observer.next(salida);
        /*         if (contador == 3) {
          clearInterval(intervalo);
          observer.complete();
        } */
        /*   if (contador == 2) {
          observer.error("Auxilio");
        } */
      }, 500);
    }).pipe(
      map((res:any) => {
        return res.valor;
      }),
      filter((value, index) => {
        if (value % 2 == 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
