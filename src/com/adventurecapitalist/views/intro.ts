import { View } from "../../gameclosure/views/view";
import { Texture, Sprite, Point, Graphics } from "pixi.js";
import { Game } from "../../gameclosure/game";
import { RouterOptionType } from "../../gameclosure/router/routerOption";
import { ImageFactory } from "../../gameclosure/factories/imageFactory";

export class Intro extends View {
    constructor() {
        super("intro");
    }

    public show() {
        super.show();

        var background: Graphics = new Graphics();
        background.beginFill(0x329957);
        background.drawRect(0, 0, Game.app.view.width, Game.app.view.height);
        background.endFill();
        this.content.addChild(background);

        var logo: Sprite = Game.imageFactory.getImage("logo");
        logo.x = (Game.app.view.width - logo.width) / 2;
        logo.y = (Game.app.view.height - logo.height) / 2;
        this.content.addChild(logo);

        var adventurelogo: Sprite = Game.imageFactory.getImage("adventurelogo");
        adventurelogo.scale = new Point(0.8, 0.8);
        adventurelogo.x = (Game.app.view.width - adventurelogo.width) / 2;
        adventurelogo.y = (Game.app.view.height - adventurelogo.height) / 2;
        this.content.addChild(adventurelogo);

        var timeLine: TimelineLite = new TimelineLite();
        timeLine.from(logo, { alpha: 0, duration: 1 });
        timeLine.from(logo, { alpha: 1, duration: 1, delay: 1 });
        timeLine.from(adventurelogo, { alpha: 0, duration: 1 }, "end");
        timeLine.from(background, { alpha: 0, duration: 1 }, "end");
        timeLine.to(adventurelogo, { alpha: 0, duration: 1, delay: 2 });
        timeLine.play();

        timeLine.eventCallback("onComplete", () => {
            Game.router.show("companies");
        });
    }
}