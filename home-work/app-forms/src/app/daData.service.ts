import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {DadataInterface} from './dadata.interface';

@Injectable(
  {providedIn: 'root'}
)
export class DaDataService {
  http = inject(HttpClient);


  #apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  token = "7aaeafb936f84148b80917f4eac1b4b53e7a2082";
  getSuggestions(query: string | null) {
    return this.http.post<{suggestions: DadataInterface[]}>(this.#apiUrl, {query}, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + this.token
      },
    }).pipe(
      map(res => {
        return res.suggestions
        // return Array.from(new Set(res.suggestions.map((suggestion: DadataInterface)=> {
        //   return suggestion.data.city
        // })))
      })
    )
  }

}
