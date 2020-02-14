enum NumberScale { }
export class Money {
    private _formatted: string = "";
    private _unit: string = "";
    private _currency = "$";

    private _units: string[] = [
        "",
        "MILLION",
        "BILLION",
        "TRILLION",
        "QUADRILLION",
        "QUINTILLION",
        "SEXTILLION",
        "SEPTILLION",
        "OCTILLION"];

    constructor(value: number) {
        this.convert(value);
    }

    get formatted() {
        return this._formatted || "";
    }

    get unit() {
        return this._unit || "";
    }

    public convert(value: number, min: number = 1): void {
        min = min || 1e3;

        if (value >= min) {
            var order = Math.floor(Math.log(value) / Math.log(1000));

            this._unit = this._units[(order - 1)];
            
            if (value < 999999) {
                this._formatted = this._currency + value.toLocaleString("en-US");    
            } else if (value < 999999999) {
                this._formatted = this._currency + parseFloat(value.toLocaleString("pt-BR")).toLocaleString("en-US");
            } else {
                this._formatted = this._currency + parseFloat(value.toLocaleString("pt-BR")).toString();
            }
        }
    }
}