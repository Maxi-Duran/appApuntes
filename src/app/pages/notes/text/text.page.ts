import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit {
  note: any = {
    name: '',
    text: '',
    teacher: '',
  };

  @ViewChild('editableDiv', { static: false }) editableDiv!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService,
    private platform: Platform
  ) {}

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.getNote(noteId);
    }
  }

  async foto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: this.platform.is('hybrid')
        ? CameraSource.Camera
        : CameraSource.Prompt,
    });

    if (image.webPath) {
      this.insertImage(image.webPath);
    }
  }

  insertImage(imageUrl: string) {
    const img = `<img src="${imageUrl}" class="image-thumb" style="display: block; margin: 10px 0;" />`;
    const editableDiv = this.editableDiv.nativeElement;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents(); // Elimina el contenido seleccionado si hay alguno

      // Crea un nuevo div para la imagen
      const div = document.createElement('div');
      div.innerHTML = img;
      range.insertNode(div);

      // Inserta un nuevo elemento <br> para crear un espacio entre la imagen y el siguiente texto
      const br = document.createElement('br');
      range.insertNode(br);

      // Mueve el cursor después de la imagen
      range.setStartAfter(br);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      // Asegúrate de que el contenido de la nota se actualice
      this.onInput({} as Event);
    } else {
      console.error('No hay selección activa para insertar la imagen.');
    }
  }

  onInput(event: Event) {
    const editableDiv = this.editableDiv.nativeElement;
    this.note.text = editableDiv.innerHTML;
  }

  getNote(id: string) {
    this.firestore.getNoteById(id).subscribe((note) => {
      this.note = note;
      if (this.editableDiv) {
        this.editableDiv.nativeElement.innerHTML = note.text;
      }
    });
  }

  updateNote() {
    const data = {
      name: this.note.name,
      text: this.note.text, // Guardar el contenido completo
      teacher: this.note.teacher,
    };
    this.firestore.updateNote(this.note.id, data);
    console.log('actualizando');
  }
}
