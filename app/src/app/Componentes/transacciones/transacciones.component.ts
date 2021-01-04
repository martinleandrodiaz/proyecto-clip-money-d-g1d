import { Component, OnInit } from '@angular/core';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {

  constructor(private modalQuienesSomosService: ModalQuienesSomosService) { }

  ngOnInit(): void {
  }

  ingresarDolares(){
    this.modalQuienesSomosService.Alert('En construccion');
  }

}
