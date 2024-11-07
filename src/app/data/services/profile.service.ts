import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)
  baseUrl = 'https://icherniakov.ru/yt-course/';
  constructor() { }

  getTestAccount() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`)
  }
}
