import {IonDatetime} from "@ionic/angular";
import {Coach} from "./coach";

export class Group {
  id: string;
  creation_date: IonDatetime;
  name: string;
  coach: Coach;
}
