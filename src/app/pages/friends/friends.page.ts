import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FriendsService } from 'src/app/services/friends.service';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  constructor(
    private friendsservice: FriendsService,
    private firestore: FirestoreService
  ) {}
  @ViewChild(IonModal) modal!: IonModal;
  message: string = '';
  activeSection: string = 'chats';
  items: MenuItem[] | undefined;
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
        })
        .catch((error) => {
          console.error('Error al enviar la solicitud:', error);
          this.message = 'Error al agregar amigo.';
        });
    } else {
      this.message = 'El ID del amigo no puede estar vacío.';
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
        console.log('Solicitud aceptada');
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

          friendId: friend.id,
        }));
      });
  }
}
