import { DisplayComponent } from "../components/display/DisplayComponent";
import { Container } from "pixi.js";

export class View extends DisplayComponent {
    constructor(id?: string, container?: Container) {
        super(id, container || new Container());
    }

    public show(): void {
        this.content.visible = true;

        this.emit(ViewEvent.VIEW_OPENED);
    }

    public hide(): void {
        this.content.visible = false;
        this.destroy();
    }

    public destroy(): void {
        this.clear();
        
        if (this._content.parent != null) {
            this._content.parent.removeChild(this._content);
        }

        delete this._content;

        this.emit(ViewEvent.VIEW_DESTROYED);
    }
}