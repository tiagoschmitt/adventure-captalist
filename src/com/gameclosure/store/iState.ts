export interface IState {
    [key : string]: any
    getState(id: string): IState;
}