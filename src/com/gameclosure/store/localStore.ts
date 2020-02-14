import { IStore } from "./iStore";
import { Storeable } from "./storeable";

export class LocalStore implements IStore {
    private _id: string;
    private _frequency: number;
    private _data: any;

    constructor(id: string, frequency: number) {
        this._id = id;
        this._frequency = frequency;

        setInterval(this.sendData.bind(this), this._frequency * 1000);
    }

    public save(store: Storeable): void {
        this._data = store.data;
    }

    public retrive(): any {
        var data: any = localStorage.getItem(this._id);
        
        if (data != null) {
            return JSON.parse(data);
        }
    }

    private sendData() {
        if (this._data != null) {
            localStorage.setItem(this._id, JSON.stringify(this._data));
        }
    }
}