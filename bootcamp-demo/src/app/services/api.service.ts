import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {MarketItem as MarketResponse} from "../models/market_stats";
import {take} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class ApiService {

    private baseUrl = 'https://api.evemarketer.com/ec/';
    private marketResponses: BehaviorSubject<MarketResponse[]>;

    private nameToId = new Map([
        ["Veldspar", 1230],
        ["Scordite", 570],
        ["Pyroxeres", 1224],
        ["Plagioclase", 18]
    ]);

    private idToName = new Map([
        [1230, "Veldspar"],
        [570, "Scordite"],
        [1224, "Pyroxeres"],
        [18, "Plagioclase"]
    ]);

    private endpoints = new Map([
        ["Marketstat", 'marketstat/json']
    ]);

    constructor(
        private http: HttpClient
    ) {
      this.marketResponses = new BehaviorSubject<MarketResponse[]>([]);
    }

    public urlBuilder(itemNames: string[], endpoint: string): string {
        let url = this.baseUrl + this.endpoints.get(endpoint) + "?typeid=";

        itemNames.forEach(item => {
            url += this.nameToId.get(item) + ",";
        });

        url = url.slice(0, -1);
        console.log(url);

        return url;
    }

    public marketStatCall(itemNames: string[], endpoint: string){
      let url = this.urlBuilder(itemNames, endpoint);

      this.http.get<MarketResponse>(url)
        .pipe(take(1))
        .subscribe(response => {
          let index = 0;
          response.forEach( marketItem => {
            marketItem.name = itemNames[index];
            index++;
          })
          this.marketResponses.next(response);
          console.log(response);
        });
    }

    public getMarketResponse(): Observable<MarketResponse[]> {
      return this.marketResponses.asObservable();
    }
}
