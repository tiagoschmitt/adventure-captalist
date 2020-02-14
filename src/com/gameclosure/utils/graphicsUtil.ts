import { Graphics } from "pixi.js";

export class GraphicsUtil {
    public static drawRect(width: number, height: number, color: number, alpha: number = 1, borderColor?: number, radius?: number): Graphics {
        var graphic: Graphics = new Graphics();

        graphic.beginFill(color, alpha);

        if (borderColor != null) {
            graphic.lineStyle(3, borderColor);
        }

        if (radius != null) {
            graphic.drawRoundedRect(0, 0, width, height, radius);
        } else {
            graphic.drawRect(0, 0, width, height);
        }

        graphic.endFill();

        return graphic;
    }
}