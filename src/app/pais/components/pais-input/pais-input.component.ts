import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = ''

  @Output() onEnter: EventEmitter<string> = new EventEmitter()
  @Output() onDebounce: EventEmitter<string> = new EventEmitter()

  deboucer: Subject<string> = new Subject()

  public termino: string = ''

  constructor(
  ) { }

  ngOnInit(): void {
    this.deboucer
    .pipe(debounceTime(300))
    .subscribe( valor => {
      // console.log('debouncer:', valor)
      this.onDebounce.emit( valor )
    })
  }

  buscar() {
    this.onEnter.emit(this.termino)
  }

  teclaPresionada() {
    this.deboucer.next( this.termino )
  }

}
