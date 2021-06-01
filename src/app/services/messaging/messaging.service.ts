import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { MainService } from '../main/main.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging, private mainService: MainService) {
    this.angularFireMessaging.messaging.subscribe((_messaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    })
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      console.log(token);
      this.mainService.addWebtoken(token).subscribe((res: any) => {});;
    },
    (err) => {
      console.error('Unable to get permission to notify.', err);
    });
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    })
  }
}
