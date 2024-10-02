import { Component, OnInit } from '@angular/core';
import { BdlocalService } from 'src/app/service/bdlocal.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  nombre!: string;

  asignatura: any = [];

  constructor(private bdLocalService: BdlocalService) {}

  guardarEnBD() {
    console.log(this.nombre);

    this.bdLocalService.guardarContactos(this.nombre);
    this.asignatura = this.bdLocalService.mostrarBD();
    console.log(this.asignatura);
  }
  ngOnInit() {}
}
