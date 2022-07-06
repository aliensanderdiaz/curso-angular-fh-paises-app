import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    // `
    //   img { max-width: 100% }
    // `
  ]
})
export class PorPaisComponent implements OnInit {

  public termino: string = ''
  public hayError: boolean = false
  public paises: Country[] = []
  public paisesSugeridos: Country[] = []

  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.hayError = false
    this.termino = termino
    console.log(this.termino)
    this.paisService.buscarPais( this.termino )
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
    this.paises = []
    this.termino = event

    this.paisService.buscarPais(event)
      .subscribe({
        next: paises => this.paisesSugeridos = paises.splice(0, 5),
        error: err => this.paisesSugeridos = []
      })
  }

  onSugerencia(termino: string) {
    this.termino = termino
    this.paisesSugeridos = []
    this.buscar(this.termino)
  }

}
