import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { MarketItem as MarketResponse } from "../models/market-stats";
import { take } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ApiService {

    private baseUrl = 'https://api.evemarketer.com/ec/';
    private marketResponses: BehaviorSubject<MarketResponse[]>;

    // TODO: Use .csv file data instead
    private nameToId = new Map([
        ["Veldspar", 1230],
        ["Scordite", 570],
        ["Pyroxeres", 1224],
        ["Plagioclase", 18],
        ["Factory Folder",28],
        ["Tritanium",34],
        ["Pyerite",35],
        ["Mexallon",36],
        ["Isogen",37],
        ["Nocxium",38],
        ["Zydrine",39],
        ["Megacyte",40],
        ["Garbage",41],
        ["Spiced Wine",42],
        ["Antibiotics",43],
        ["Enriched Uranium",44],
        ["Frozen Plant Seeds",45]
    ]);

    private endpoints = new Map([
        ["Marketstat", 'marketstat/json']
    ]);

    constructor(
        private http: HttpClient
    ) {
      this.marketResponses = new BehaviorSubject<MarketResponse[]>([]);
    }

    // Here we dynamically build the URL based on the selected items' IDs.
    public urlBuilder(itemNames: string[], endpoint: string): string {
        let url = this.baseUrl + this.endpoints.get(endpoint) + "?typeid=";

        // So we can fetch data on multiple items, we append each item and a comma to the URL.
        itemNames.forEach(item => {
            url += this.nameToId.get(item) + ",";
        });

        // However, we need to remove the last comma to make the API call work.
        url = url.slice(0, -1);
        console.log(url);

        return url;
    }

    public marketStatCall(itemNames: string[], endpoint: string){
      let url = this.urlBuilder(itemNames, endpoint);

      // We receive the API response.
      this.http.get<MarketResponse>(url)
        // Connection only takes one response and then closes to preserve resources.
        .pipe(take(1)) 
        .subscribe(response => {
          let index = 0;
          /**  
           * Because the API data does not contain the name of the item,
           * we need to insert the name into the API JSON data we receive.
           * To accurately do this, we need to count the index of the
           * data and insert the correct name into the JSON data.
          */
          response.forEach(marketItem => {
            marketItem.name = itemNames[index];
            index++;
          })

          this.marketResponses.next(response);
        });
    }

    public getMarketResponse(): Observable<MarketResponse[]> {
      return this.marketResponses.asObservable();
    }

    public getItemNames(): string[] {
      // Get all keys (item names) from nameToId map.
      return [...this.nameToId.keys()];
    }
}
