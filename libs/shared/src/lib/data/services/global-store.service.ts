import { Injectable, signal } from '@angular/core';
import { Profile } from '@ac/interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService {
  me = signal<Profile | null>(null);
}