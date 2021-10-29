import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    
    private baseUrl = 'https://api.evemarketer.com/ec/';

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
    ) {}

    public urlBuilder(itemNames: string[], endpoint: string): string {
        let url = this.baseUrl + this.endpoints.get(endpoint) + "?typeid=";

        itemNames.forEach(item => {
            url += this.nameToId.get(item) + ",";
        });

        url = url.slice(0, -1);
        console.log(url);

        return url;
    }
}


