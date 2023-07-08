import { Component } from '@angular/core';
import { navData } from './core/data/navData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marketfront';
  navData = navData;
  mostrar: boolean = false;

  toggleMenu(): void {
    this.mostrar = !this.mostrar;
  }
}
