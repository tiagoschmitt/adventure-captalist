import { Storeable } from "./storeable";

export interface IStore {
    save(data: Storeable): void;
    retrive(): any;

}