import { Component, OnInit } from '@angular/core';
import { ConvertServiceService } from '../../services/convert-service.service';

@Component({
    selector: 'app-convert-app',
    templateUrl: './convert-app.component.html',
    styleUrls: ['./convert-app.component.css'],
    providers: [ConvertServiceService]
})
export class ConvertAppComponent implements OnInit {

    baseAmount: number;
    convertAmount: number;
    baseCurrency: string = null;
    convertCurrency: string = null;
    rates: Array<any> = [];  
    fromRates: Object = {};
    disclaimerFlag: boolean = false;

    constructor(private convertService: ConvertServiceService) { }

    ngOnInit() {
        this.convertCurrencyVal(false, true);
    }

    public convertCurrencyVal(reverse, initial) {
        this.convertService.getRates(this.baseCurrency).then(response => {
            if (response.rates) {
                if (initial) {
                    const items: Array<any> = this.parseData(response.rates);
                    items.push({ id: 'EUR', value: 1 });
                    let newCurrList = [
                        {
                            id:"CAD",
                            value:items[3].value
                        },
                        {
                            id:"USD",
                            value:items[30].value
                        },{
                            id:"EUR",
                            value:items[32].value
                        }
                    ]
                    this.rates = newCurrList;
                    this.baseCurrency = this.rates[1].id;
                    this.convertCurrency = this.rates[2].id;
                    this.convertCurrencyVal(false, false);
                }
                this.fromRates = response.rates;
                this.getCurrencyRate(reverse);
            }
        });
    }

    public getCurrencyRate(reverse) {
        if (reverse) {
            this.baseAmount = this.convertAmount / this.fromRates[this.convertCurrency];
        } else {
            this.convertAmount = this.baseAmount * this.fromRates[this.convertCurrency];
        }
    }

    private parseData(data) {
        const arr: Array<any> = [];
        for (const key in data) {
            if (key) {
                const obj = {
                    id: key,
                    value: data[key]
                };
                arr.push(obj);
            }
        }
        return arr;
    }

    showDisclaimer() {
        this.disclaimerFlag = !this.disclaimerFlag;
    }

}
