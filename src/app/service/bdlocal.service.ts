import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Asignatura } from '../interfaces/diccionario';
@Injectable({
  providedIn: 'root',
})
export class BdlocalService {
  asignatura: Asignatura[] = [];
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    public toastController: ToastController
  ) {
    this.Init();
    this.cargarContactos();
  }

  async Init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async cargarContactos() {
    const miasignatura = await this.storage.get('asignatura');
    if (miasignatura) {
      this.asignatura = miasignatura;
    }
  }

  guardarContactos(nombre: string) {
    this.asignatura.unshift({ strNombre: nombre }); //inserto nuevo nro
    this._storage?.set('asignatura', this.asignatura);
    this.presentToast('Contacto Agregado');
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      translucent: true,
      color: 'medium',
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }

  async mostrarBD() {
    return this.asignatura;
  }
}
