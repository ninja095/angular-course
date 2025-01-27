import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { Profile } from '../index';
import { GlobalStoreService, Pageble } from '../../common';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  #globalStoreService = inject(GlobalStoreService);
  baseUrl = 'https://icherniakov.ru/yt-course/';
  constructor() {}

  me = signal<Profile | null>(null);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`);
  }

  getAccountById(id: string) {
    return this.http.get<Profile>(`${this.baseUrl}account/${id}`);
  }
  getSubscribers(count: number = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseUrl}account/subscribers/`)
      .pipe(map((response) => response.items.slice(0, count)));
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseUrl}account/me`)
      .pipe(tap((profile) => {
        this.me.set(profile)
        this.#globalStoreService.me.set(profile)
      }));
  }

  patchProfile(data: Partial<Profile>) {
    return this.http
      .patch<Profile>(`${this.baseUrl}account/me`, data)
      .pipe(tap((profile) => this.me.set(profile)));
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http
      .post<Profile>(`${this.baseUrl}account/upload_image`, formData)
      .pipe(tap((profile) => this.me.set(profile)));
  }

  getFilteredProfiles(params: Record<string, any>) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseUrl}account/accounts`, { params })
  }
}
