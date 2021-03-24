import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private _token: string;
  private _pageSize: number;
  private _updatePeriodInSec: number;
  private _forcedLanguage: string;

  private readonly TOKEN_KEY = 'token';
  private readonly PAGE_SIZE_KEY = 'page_size';
  private readonly UPDATE_PERIOD_KEY = 'update_period';
  private readonly FORCED_LANGUAGE_KEY = 'forced_language'

  constructor(private storage: Storage, private translate: TranslateService,) {
    this.initStorage();
  }

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this.storage.set(this.TOKEN_KEY, value);
    this._token = value;
  }

  public get pageSize(): number {
    return this._pageSize;
  }

  public set pageSize(value: number) {
    this.storage.set(this.PAGE_SIZE_KEY, value);
    this._pageSize = value;
  }

  public get updatePeriodInSec(): number {
    return this._updatePeriodInSec;
  }

  public set updatePeriodInSec(value: number) {
    this.storage.set(this.UPDATE_PERIOD_KEY, value);
    this._updatePeriodInSec = value;
  }

  public get forcedLanguage(): string {
    return this._forcedLanguage;
  }

  public set forcedLanguage(value: string) {
    this.storage.set(this.FORCED_LANGUAGE_KEY, value);
    this.translate.use(value);
    this._forcedLanguage = value;
  }

  clear() {
    this._token = null;
    this._forcedLanguage = null;
    this._pageSize = null;
    this._updatePeriodInSec = null;
    return this.storage.clear();
  }

  private async initStorage() {
    this._forcedLanguage = await this.storage.get(this.FORCED_LANGUAGE_KEY);
    this._token = await this.storage.get(this.TOKEN_KEY);
    this._pageSize = await this.storage.get(this.PAGE_SIZE_KEY);
    this._updatePeriodInSec = await this.storage.get(this.UPDATE_PERIOD_KEY);
    this.translate.use(this.forcedLanguage);
  }
}
