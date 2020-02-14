import { IState } from "../../gameclosure/store/iState";
import { CompanyState } from "./companyState";

export class GameState implements IState {
    username?: string;
    total?: number;
    timestamp?: number;
    companies: CompanyState[];
    
    getState(id: string): IState {
        throw new Error("Method not implemented.");
    }
}