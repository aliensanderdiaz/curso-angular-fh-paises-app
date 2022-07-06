import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  public termino: string = ''
  public hayError: boolean = false
  public paises: Country[] = []

  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.hayError = false
    this.termino = termino
    console.log(this.termino)
    this.paisService.buscarCapital( this.termino )
    .subscribe({
      next: (data: any) => {
        console.log({ data })
        this.paises = data
      },
      error: (err: any) => {
        this.hayError = true
        this.paises = []
        console.log({ err })
      },
    })
  }

  sugerencias(event: string) {
    this.hayError = false
  }

}
