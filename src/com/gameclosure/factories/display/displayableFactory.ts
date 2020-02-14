
import { ImageDisplayComponent } from "../../components/display/imageDisplayComponent";
import { DisplayComponent } from "../../components/display/DisplayComponent";

export interface DisplaylableFactory {
    create(id: string): ImageDisplayComponent;
    create<T>(id?: string, Component?: { new (id?: string): T; }): T;
}