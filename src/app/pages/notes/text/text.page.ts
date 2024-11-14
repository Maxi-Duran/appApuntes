import { Keyboard } from '@capacitor/keyboard';

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit {
  newText = '';
  note: any = {
    name: '',
    text: '',
    teacher: '',
  };

  mytext = 'hola';
  recording = false;

  loading: boolean = false;

  @ViewChild('editableDiv', { static: false }) editableDiv!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService,
    private platform: Platform,
    private changeDetector: ChangeDetectorRef
  ) {
    SpeechRecognition.requestPermissions();
  }

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.getNote(noteId);
    }
    this.keyboard();
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
    const img = `<img src="${imageUrl}" class="image-thumb" style="display: block; margin: 10px auto; width: 200px; height: auto;" />`;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();

      const div = document.createElement('div');
      div.innerHTML = img;
      range.insertNode(div);

      const br = document.createElement('br');
      range.insertNode(br);

      range.setStartAfter(br);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

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
      text: this.note.text,
      teacher: this.note.teacher,
    };
    this.firestore.updateNote(this.note.id, data);
    console.log('actualizando');
  }

  //speech to text

  async startRecording() {
    this.recording = true;
    this.editableDiv.nativeElement.focus();
    const { available } = await SpeechRecognition.available();
    if (available) {
      console.log('IS AVAILABLE');

      await SpeechRecognition.removeAllListeners();

      SpeechRecognition.start({
        language: 'es-MX',
        prompt: 'Di Algo',
        partialResults: true,
        popup: false,
      });

      SpeechRecognition.addListener('partialResults', (data: any) => {
        console.log('RESULTADOS', data.matches);
        if (data.matches && data.matches.length > 0) {
          this.newText = data.matches[0];
          this.changeDetector.detectChanges();

          this.editableDiv.nativeElement.innerHTML =
            this.note.text + ' ' + this.newText;
        }
      });
    }
  }

  async stopRecording() {
    this.recording = false;
    this.editableDiv.nativeElement.focus();
    SpeechRecognition.stop();

    this.note.text += ' ' + this.newText;
    this.changeDetector.detectChanges();
  }

  //control del keyboard
  activeKeyboard = false;
  showOptions = false;
  showOptions2 = false;
  keyboard() {
    Keyboard.addListener('keyboardDidShow', () => {
      this.activeKeyboard = true;
    });

    Keyboard.addListener('keyboardDidHide', () => {
      this.activeKeyboard = false;
      this.showOptions2 = false;
      this.showOptions = false;
    });
  }
  //abrir div de opciones
  optionsDiv() {
    this.activeKeyboard = false;
    this.showOptions = true;
    this.editableDiv.nativeElement.focus();
  }
  //cerrar div de opciones
  closeOptionsDiv() {
    this.showOptions = false;
    this.activeKeyboard = true;
    this.editableDiv.nativeElement.focus();
  }
  //abrir div de opciones
  optionsDiv2() {
    this.activeKeyboard = false;
    this.showOptions2 = true;
    this.editableDiv.nativeElement.focus();
  }
  //cerrar div de opciones
  closeOptionsDiv2() {
    this.showOptions2 = false;
    this.activeKeyboard = true;
    this.editableDiv.nativeElement.focus();
  }
}
