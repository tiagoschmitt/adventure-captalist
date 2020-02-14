import { Sprite } from "pixi.js";
import { DisplayComponent } from "./DisplayComponent";

export class ImageDisplayComponent extends DisplayComponent {
    constructor(content: Sprite) {
        super(content.name, content);
    }
}