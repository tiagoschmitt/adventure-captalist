import { View } from "../views/view";

export enum RouterOptionType { NORMAL = 1, MODAL = 2};

export class RouterOption {
    
    isDefault?: Boolean;
    path: string;
    component: typeof View;
    componentRef?: View;
    type: RouterOptionType;
}