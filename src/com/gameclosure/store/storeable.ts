import { IStore } from "./iStore";

export interface Storeable {
    data: any;
    storage: IStore;
}