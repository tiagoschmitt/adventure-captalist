import { Texture, Sprite } from "pixi.js";

export class ImageFactory {
    public getImage(id: string):Sprite {
        return new Sprite(Texture.fromFrame(id));
    }
}