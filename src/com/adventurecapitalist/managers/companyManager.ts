import { GameState } from "../store/gameState";
import { Game } from "../../gameclosure/game";
import { CompanyState } from "../store/companyState";

export class CompanyManager {
    private _state: GameState;

    constructor() {
        this._state = (Game.store.data as GameState);

        this.project()
    }

    public update() {
        var companies: CompanyState[] = this._state.companies;
        this._state.timestamp = Date.now();

        companies.forEach((state: CompanyState) => {
            if (state.owned > 0) {
                this.cost(state);

                if (state.hasManager) {
                    state.progressStarted = true;

                    if (state.progress == 100) {
                        this.updateTotal(state);
                        
                        state.progress = 0;
                        state.timestamp = Date.now();
                    } else {
                        this.progress(state);
                    }
                } else {
                    if (state.progress == 100) {
                        state.progress = 0;
                        state.progressStarted = false;
                        
                        this.updateTotal(state);

                    } else if (state.progress == 0 && state.progressStarted) {
                        state.timestamp = Date.now();
                        state.progress = 1;

                    } else if (state.progress > 0) {
                        this.progress(state);
                    }
                }

                this.timer(state);
            }
        });
    }


    private cost(state: CompanyState): void {
        state.currentCost = state.initialCost * (state.coefficient * state.owned);
    }

    private timer(state: CompanyState): void {
        state.currentTime = ((100 - state.progress) / 100) * this.initialTime(state);
    }

    private progress(state: CompanyState): void {
        var currentSec = (Date.now() - state.timestamp);
        var progress = (currentSec * 100) / (this.initialTime(state) * 1000);
        
        state.progress = progress < 100 ? progress : 100;
    }

    private updateTotal(state: CompanyState): void {
        this._state.total += state.initialRevenue * state.owned;
    }

    private initialTime(state: CompanyState): number {
        var factor: number = Math.ceil(state.owned / 25)

        if (factor == 0) {
            return 1;
        }

        return state.initialTime / factor;
    }

    private project(): void {
        var companies: CompanyState[] = this._state.companies;

        if (this._state.timestamp != null) {
            var currentTime: number = Date.now();
            var totalDiff: number = currentTime - this._state.timestamp;

            companies.forEach((state: CompanyState) => {
                if (state.hasManager) {
                    state.timestamp;

                    var stateCicles: number = Math.floor(totalDiff / (state.initialTime * 1000));
                    this._state.total += stateCicles * (state.initialRevenue * state.owned);

                    var remainder: number = (totalDiff % (state.initialTime * 1000)) / 1000;

                    var progress = (remainder * 100) / (this.initialTime(state) * 1000);
                    state.progress = progress < 100 ? progress : 100;
                }
            });
        }
    }
}