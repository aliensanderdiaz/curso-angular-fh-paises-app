import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    .mr-5 {
      margin-right: 5px;
    }
  `]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania']
  regionActiva: string = ''
  paises: Country[] = []

  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
  }

  getClassCSS(region: string): string {
    return region === this.regionActiva ? 'btn btn-primary mr-5': 'btn btn-outline-primary mr-5'
  }

  activarRegion(region: string) {
    if (this.regionActiva === region) { return }
    this.regionActiva = region
    this.paises = []

    this.paisService.buscarRegion( region )
      .subscribe({
        next: (paises: Country[]) => this.paises = paises
      })
  }

}
