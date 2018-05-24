import { Component, OnInit } from '@angular/core';
import { ConvertServiceService } from '../../services/convert-service.service';

@Component({
    selector: 'app-convert-app',
    templateUrl: './convert-app.component.html',
    styleUrls: ['./convert-app.component.css'],
    providers: [ConvertServiceService]
})
export class ConvertAppComponent implements OnInit {

    baseAmount: any;
    convertAmount: any;
    baseCurrency: string = null;
    convertCurrency: string = null;
    rates: Array<any> = [];
    fromRates: Object = {};
    disclaimerFlag: boolean = false;
    error: any = null;

    constructor(private convertService: ConvertServiceService) { }

    ngOnInit() {
        this.convertCurrencyVal(false, true);
    }

    public convertCurrencyVal(reverse, initial) {
        this.convertService.getRates(this.baseCurrency).then(response => {
            if (response.rates) {
                if (initial) {
                    const items: Array<any> = this.parseData(response.rates);
                    console.log("items=>", items);
                    items.push({ id: 'EUR', value: 1 });
                    let newCurrList = [
                        {
                            id: "CAD",
                            value: this.getValue("CAD",items)
                        },
                        {
                            id: "USD",
                            value: this.getValue("USD",items)
                        }, {
                            id: "EUR",
                            value: this.getValue("EUR",items)
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

    //function to get the value of selected id from newCurrList
    getValue(key, array) {
        for (var el in array) {
            if (array[el].hasOwnProperty(key)) {
                return array[el][key];
            }
        }
    }


    public getCurrencyRate(reverse) {
        if (this.baseCurrency === this.convertCurrency) {
            this.convertAmount = this.baseAmount;
        } else if (this.convertCurrency === this.baseCurrency) {
            this.baseAmount = this.convertAmount;
        } else if (reverse) {
            this.baseAmount = this.formatDecimal(this.convertAmount / this.fromRates[this.convertCurrency]);
        } else {
            this.convertAmount = this.formatDecimal(this.baseAmount * this.fromRates[this.convertCurrency]);
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

    formatDecimal(num: number): string {
        return (Number(num) * 100 / 100).toFixed(2);
    }
}
