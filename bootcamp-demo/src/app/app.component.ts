import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';

import { MarketItem as MarketResponse } from './models/market_stats';
import { Subject } from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  destroy: Subject<void> = new Subject<void>();
  marketResponses: MarketResponse[] = [];

  constructor(
    private http: HttpClient,
    private apiService: ApiService
    ) { };

  ngOnInit() {
    this.apiService.marketStatCall(["Veldspar", "Scordite"], "Marketstat");

    this.apiService.getMarketResponse().pipe(takeUntil(this.destroy)).subscribe(marketResponses => {
      this.marketResponses = marketResponses;
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
