import { Container } from "pixi.js";
import { Displayable } from "./displayable";
import { BaseComponent } from "../baseComponent";

export class DisplayComponent extends BaseComponent implements Displayable {
    protected _content: Container;
    protected _x: number;
    protected _y: number;

    constructor(id?: string, content?: Container) {
        super(id || content.name);

        this._content = content;

        if (content == null) {
            this._content = new Container();
        }

        this.draw();
    }

    protected draw(): void {

    }

    public get id(): string {
        return this._id;
    }
    
    public clear(): void {
        this.position(0, 0);
    }

    public add(component: DisplayComponent): void {
        super.add(component);

        this.content.addChild(component.content);
    }

    public remove(component: DisplayComponent): void {
        super.remove(component);

        this.content.removeChild(component.content);
    }

    set x(x: number) {
        this._x = x;

        if (this._content != null) {
            this._content.x = x;
        }
    }
    
    get x() {
        return this._x;
    }

    set y(y: number) {
        this._y = y;
        
        if (this._content != null) {
            this._content.y = y;
        }
    }

    get y() {
        return this._y;
    }

    public position(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public set content(content: Container) {
        this._content = content;
    }

    public get content() {
        return this._content;
    }
}