import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
})
export class ImageViewComponent implements OnInit {
  public image: string;


  constructor(private modalCtrl: ModalController, navParams: NavParams) {
    this.image = navParams.get("image");
  }

  ngOnInit() {

  }

  dismissModel() {
    this.modalCtrl.dismiss();
  }

}
