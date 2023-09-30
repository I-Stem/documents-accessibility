import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(){}

  private chatUser = new BehaviorSubject('');
  currentChatUserId = this.chatUser.asObservable();

  // private theme = new BehaviorSubject('default');
  // themeSelected = this.theme.asObservable();

  static convertIdToObject(id: string) {
    return {
      $oid: id,
    };
  }

  static convertDateToObject(date: string) {
    return {
      $date: date,
    };
  }

  static convertISODatetoReadable(date: string) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dateOb = new Date(date);
    const day = String(dateOb.getDate()).padStart(2, "0");
    const month = monthNames[dateOb.getMonth()];

    const year = dateOb.getFullYear();
    const time = String(dateOb.getHours()).padStart(2, "0");
    const min = String(dateOb.getMinutes()).padStart(2, "0");
    const output = day + "-" + month + "-" + year + " " + time + ":" + min;

    return output;
  }
 
  changeChatUserId(user: any) {
    this.chatUser.next(user);
  }

  // changeTheme(theme: string) {
  //   this.theme.next(theme);
  // }

}
