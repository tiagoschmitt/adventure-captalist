import { Reusable } from "../pool/reusable";
import { Updatable } from "./updatable";

export class BaseComponent extends PIXI.utils.EventEmitter implements Reusable, Updatable {
    
    protected _children: Array<BaseComponent>;
    protected _id: string;
    protected _parent: BaseComponent;
    
    constructor(id?:string) {
        super();
        
        this._id = id;
        this._children = new Array<BaseComponent>();
    }
    
    get id():string {
        return this._id;
    }

    get parent(): BaseComponent {
        return this._parent;
    }
     
    public update(): void {
        for (let component of this._children) {
            component.update();
        }
    }

    public clear(): void {
        for (let component of this._children) {
            component.clear();
        }

        this._children = new Array<BaseComponent>();
    }

    public add(component: BaseComponent): void {
        component._parent = this;
        this._children.push(component);
    }

    public remove(component: BaseComponent): void {
        var index: number = this._children.indexOf(component);

        if (index >= 0) {
            this._children.splice(index, 1);
        }
    }

    public children(): Array<BaseComponent> {
        return this._children;
    }
}
