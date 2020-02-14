import { Rectangle, Graphics, Text, TextStyle } from "pixi.js";
import { DisplayComponent } from "../../../../gameclosure/components/display/DisplayComponent";
import { GraphicsUtil } from "../../../../gameclosure/utils/graphicsUtil";
import { CompanyState } from "../../../store/companyState";
import { Game } from "../../../../gameclosure/game";

export class InvestmentTimer extends DisplayComponent {
    public size: Rectangle;
    private _timerText: Text;
    private _state: CompanyState;

    constructor(id: string) {
        super(id);
    }

    protected draw() {
        this._state = Game.store.getState(this.id, "companies") as CompanyState;
        this.size = new Rectangle(0, 0, 58, 50);

        var background: Graphics = GraphicsUtil.drawRect(this.size.width, this.size.height, 0x6a8a94, 1, 0x444444, 5);
        this.content.addChild(background);

        var style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 15,
            fill: "white"
        });
        
        this._timerText = new Text("", style);
        this.content.addChild(this._timerText);
    }

    public update(): void {
        var time: string = Math.floor(this._state.currentTime).toString() + "s";
        
        this.updateTimer(time);
    }

    protected updateTimer(time: string): void {
        this._timerText.text = time;

        this._timerText.x = (this.size.width - this._timerText.width) / 2;
        this._timerText.y = (this.size.height - this._timerText.height) / 2; 
    }
}