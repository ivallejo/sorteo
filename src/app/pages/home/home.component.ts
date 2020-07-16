import { Component, OnInit } from '@angular/core';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class HomeComponent implements OnInit {
  public clientes: any[] = [];
  public name: string;
  public cupones = 0;
  public sortearLoading = false;
  public ganador = false;
  public valorLoading = 0;
  // public progress = 0;
  public ganadornombre = '';
  public max = 100;
  public progress = 0;

  constructor() { }

  ngOnInit(): void {
    this.clientes.push({ name: 'Fernando Vallejo', cupones: 15});
    this.clientes.push({ name: 'Margareth Vargas', cupones: 30});
  }

  agregar() {
    if ( this.name.trim() !== '' && this.cupones > 0){

      this.clientes.push({ name: this.name, cupones: this.cupones});
      this.name = '';
      this.cupones = 0;
    }
  }

  public changeProgress(value: number): void {
    this.progress = value;
  }

  sortear() {

     const notRandomNumbers = [];
     for (let index = 0; index < this.clientes.length; index++) {
        for (let cupones = 0; cupones < this.clientes[index].cupones; cupones++) {
          notRandomNumbers.push(this.clientes[index].name);
        }
      }
     console.log(notRandomNumbers);
     // const notRandomNumbers = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
     const idx = Math.floor(Math.random() * notRandomNumbers.length);
     this.ganadornombre = notRandomNumbers[idx];

     setTimeout(() => {
      this.sortearLoading = true;
      this.changeProgress(100);
      this.ganador = true;
     }, 500);

  }

  sortear2() {
      this.sortearLoading = false;
      this.changeProgress(0);
      this.ganador = false;
      this.ganadornombre = '';
  }

}

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 100 });
}
