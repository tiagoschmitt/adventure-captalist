import { ImageFactory } from "../imageFactory";
import { DisplaylableFactory } from "./displayableFactory";
import { DisplayComponent } from "../../components/display/DisplayComponent";
import { ImageDisplayComponent } from "../../components/display/imageDisplayComponent";

export class DisplayComponentFactory implements DisplaylableFactory {
    protected _imageFactory: ImageFactory;

    constructor(imageFactory: ImageFactory) {
        this._imageFactory = imageFactory;
    }

    public create<T extends DisplayComponent>(id?: string, Component?: { new (id?: string): T; }): DisplayComponent {
        if (id != null && Component == null) {
            return new ImageDisplayComponent(this._imageFactory.getImage(id));
        } else if (id != null) {
            return new Component(id);
        } else {
            return new Component();
        }
    }
}