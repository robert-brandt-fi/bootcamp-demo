export interface MarketItem extends Array<MarketItem> {
    buy: TypeStat;
    sell: TypeStat;
}

export interface TypeStat {
    "volume": number,
    "wavg": number,
    "avg": number,
    "min": number,
    "max": number,
    "variance": number,
    "stdDev": number,
    "median": number,
    "fivePercent": number,
    "highToLow": boolean,
    "generated": number,
    forQuery: ForQuery
}

export interface ForQuery {
    "bid": boolean,
    "types": [
        number
    ],
    "regions": [
        number
    ],
    "systems": [
        number
    ],
    "hours": number,
    "minq": number
}