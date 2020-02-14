import { IState } from "./iState";
import { Storeable } from "./storeable";
import { IStore } from "./iStore";

export class Store<T extends IState> implements Storeable {
    public storage: IStore;

    protected _data: T;

    constructor(data: T) {
        this._data = data;
    }

    get data(): T {
        return this._data;
    }

    getState(id: string, path:string): IState {
        for (var state of this._data[path]) {
            if (id == state.id) {
                return state;
            }
        }
    }

    commit():void {
        if (this.storage != null) {
            this.storage.save(this);
        }
    }
}