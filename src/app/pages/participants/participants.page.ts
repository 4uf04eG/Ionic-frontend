import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Participant} from "../../models/participant";
import {QueryList} from "../../models/query-list";
import {AlertController, LoadingController, ModalController} from "@ionic/angular";
import {ImageViewComponent} from "../../components/image-view/image-view.component";
import {PreferencesService} from "../../services/preferences.service";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {
  public participants: QueryList<Participant>;
  public error: any;

  public editing = {};

  private currentModal: any;
  private timer: any;

  @ViewChild('file-browser') fileBrowser: ElementRef;


  constructor(
    private api: ApiService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController,
    private preferences: PreferencesService,
    // private fileChooser: Chooser
  ) {
  }

  ngOnInit() {
    this.getParticipants();

    if (this.preferences.updatePeriodInSec > 0) {
      this.timer = setInterval(() => {
        this.getParticipants();
      }, this.preferences.updatePeriodInSec * 1000)
    }
  }

  async getParticipants() {
    let loader = await this.loadingController.create()
    await loader.present()

    this.api.getParticipants().subscribe(p => {
      this.participants = p;
      loader.dismiss();
    }, error => {
      this.error = error;
      loader.dismiss();
      throw error;
    });

  }

  async showGroup(participant: Participant) {
    let alert = await this.alertController.create({
      header: 'Group',
      subHeader: participant.group.name,
      message: `Couch' ${participant.group.coach}\n Creation date ${participant.group.creation_date}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showImage(participant: Participant) {
    const modal = await this.modalController.create({
      component: ImageViewComponent,
      componentProps: {
        image: participant.image_path
      }
    });
    return await modal.present();
  }

  async uploadImage(rowIndex, event) {
    const file = event.target.files[0]

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.updateImagePath(reader.result, rowIndex)
    };
  }

  deleteImage(rowIndex) {
    this.updateImagePath(null, rowIndex);
  }

  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

  updateValue(event, cell, rowIndex) {
    this.participants.data[rowIndex][cell] = event.target.value;
    this.participants.data = [...this.participants.data];

    this.api.updateParticipant(this.participants.data[rowIndex]).subscribe();
  }

  // TODO: Duplication. Remove.
  private updateImagePath(newValue, rowIndex) {
    this.participants.data[rowIndex]['image_path'] = newValue;
    this.participants.data = [...this.participants.data];

    this.api.updateParticipant(this.participants.data[rowIndex]).subscribe();
  }

}
