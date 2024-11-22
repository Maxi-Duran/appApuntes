import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FriendsService } from 'src/app/services/friends.service';
import { FirestoreService } from 'src/app/services/firestore.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  constructor(
    private friendsservice: FriendsService,
    private firestore: FirestoreService,
    private toastController: ToastController
  ) {}
  @ViewChild(IonModal) modal!: IonModal;
  message: string = '';
  activeSection: string = 'chats';
  items: MenuItem[] | undefined;
  items2: MenuItem[] | undefined;

  friendId: string = '';
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
    ];
    this.items2 = [
      {
        icon: 'pi pi-trash',
      },
    ];
    this.getFriendRequests();
    this.getFriends();
  }

  //modal
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  //boton para enviar solicitud de de amistad
  confirm() {
    const userId = this.firestore.getUserId();
    if (this.friendId.trim()) {
      this.friendsservice
        .sendFriendRequest(userId, this.friendId)
        .then(() => {
          this.modal.dismiss('Amigo agregado con éxito', 'confirm');
          this.message = 'Solicitud enviada con éxito';
          this.presentToast('top', this.message, 3000, 'success');
        })
        .catch((error) => {
          console.error('Error al enviar la solicitud:', error);
          this.message = 'Error al agregar amigo.';

          this.presentToast('bottom', this.message, 3000, 'error');
        });
    } else {
      this.message = 'El ID del amigo no puede estar vacío.';
      this.presentToast('bottom', this.message, 3000, 'error');
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = ev.detail.data ?? 'Sin datos.';
    } else {
      this.message = 'Modal cerrado sin guardar.';
    }
  }
  //listar solicitudes de amistad
  requestList: any[] = [];
  getFriendRequests() {
    const userId = this.firestore.getUserId();
    this.friendsservice
      .getFriendRequests(this.firestore.getUserId())
      .subscribe((res) => {
        this.requestList = res.map((request) => ({
          name: request.name,
          status: request.status,
          id: request.id,
          sender: request.sender,
          receiver: userId,
        }));
      });
  }
  //aceptar solicitud
  acceptRequest(requestId: string, senderId: string, receiverId: string) {
    this.friendsservice
      .acceptFriendRequest(requestId, senderId, receiverId)
      .then(() => {
        this.message = 'Amigo agregado con éxito';
        this.presentToast('top', this.message, 3000, 'success');
      });
  }
  //rechazar solicitud
  rejectRequest(requestId: string, senderId: string, receiverId: string) {
    this.friendsservice
      .rejectFriendRequest(requestId, senderId, receiverId)
      .then(() => {
        this.message = 'Solicitud rechazada con éxito';
        this.presentToast('top', this.message, 3000, 'error');
      });
  }

  //listar amigos
  friendsList: any[] = [];
  getFriends() {
    this.friendsservice
      .getFriends(this.firestore.getUserId())
      .subscribe((res) => {
        this.friendsList = res.map((friend) => ({
          name: friend.name,

          friendId: friend.friendId,
        }));
      });
  }
  //eliminar amigo
  deleteFriend(friendId: string) {
    this.friendsservice
      .deleteFriend(friendId, this.firestore.getUserId())
      .then(() => {
        console.log(friendId);
        this.message = 'Amigo eliminado con éxito';
        this.presentToast('top', this.message, 3000, 'success');
      });
  }

  //confirmaciones

  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    msg: string,
    duration?: number,
    color?: string
  ) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2500,
      position: position,
      color: color,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }
}