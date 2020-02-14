import { IState } from "../../gameclosure/store/iState";

export class CompanyState implements IState {
    id: string;
    name: string;
    initialCost: number;
    currentCost: number;
    coefficient: number;
    initialTime: number;
    currentTime: number;
    initialRevenue: number;
    owned: number;
    multiplier: number;
    progress: number;
    progressStarted: boolean;
    hasManager: boolean;
    managerCost: number;
    timestamp?: number;

    getState<T>(id?: string): T {
        throw new Error("Method not implemented.");
    }
}