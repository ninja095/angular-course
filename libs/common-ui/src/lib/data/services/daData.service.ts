import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaDataService {
  #apiUrl = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  #http = inject(HttpClient);

  #daDataToken = "7aaeafb936f84148b80917f4eac1b4b53e7a2082"
  getSuggestions(query: string) {
    return this.#http.post(this.#apiUrl, { query },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${this.#daDataToken}`
        }
      }).pipe(
        map((res: any) => res.suggestions)
    )
  }
}
