import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
    `
      .mr-1 {
        margin-right: 5px;
      }
    `
  ]
})
export class VerPaisComponent implements OnInit {

  public pais!: Country

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.paisService.getPaisPorAlpha( id )),
        tap( console.log )
      )
      .subscribe({
        next: ((pais: Country) => this.pais = pais)
      })

    // this.activatedRoute.params.subscribe({
    //   next: ({ id }) => {
    //     console.log({ id })
    //     this.paisService.getPaisPorAlpha( id ).subscribe({
    //       next: ((data: any) => console.log({ data }))
    //     })
    //   }
    // })
  }

}
