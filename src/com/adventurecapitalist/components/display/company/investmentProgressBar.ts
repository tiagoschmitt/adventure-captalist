import { DisplayComponent } from "../../../../gameclosure/components/display/DisplayComponent";
import { Graphics, Rectangle, TextStyle, Text } from "pixi.js";
import { GraphicsUtil } from "../../../../gameclosure/utils/graphicsUtil";
import { Money } from "../../../../gameclosure/utils/money";
import { CompanyState } from "../../../store/companyState";
import { Game } from "../../../../gameclosure/game";

export class InvestmentProgressBar extends DisplayComponent {
    public size: Rectangle;
    private _progress: Graphics;
    private _incomeText: Text;
    private _state: CompanyState;

    constructor(id?: string) {
        super(id);
    }

    protected draw(): void {
        this._state = Game.store.getState(this.id, "companies") as CompanyState;
        this.size = new Rectangle(0, 0, 210, 30);

        var border:Graphics = GraphicsUtil.drawRect(this.size.width, this.size.height, 0x6a8a94, 1, 0x444444, 5);
        this.content.addChild(border);
        
        this._progress = GraphicsUtil.drawRect(this.size.width, this.size.height, 0x1ec81b);
        this.content.addChild(this._progress);

        var mask: Graphics = GraphicsUtil.drawRect(this.size.width - 4, this.size.height - 4, 0x1ec81b, 1, null, 5);
        mask.y = 2;
        mask.x = 2;
        this.content.addChild(mask);
        
        this._progress.mask = mask;

        var style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 15,
            fill: "black"
        });
        
        this._incomeText = new Text("", style);
        this._incomeText.y = 6;
        this.content.addChild(this._incomeText);

        this.progress();
    }

    public update(): void {
        if (this._state.owned > 0) {
            this.progress();
        }
    }

    protected progress(): void {
        var money: Money = new Money(this._state.initialRevenue * this._state.owned);

        this._incomeText.text = money.formatted + " " + money.unit.toLowerCase();

        var time: number = this._state.initialTime / Math.ceil(this._state.owned / 25);
        
        if (time <= 0.2) {
            this._incomeText.text += "/sec"
            this._progress.width = this.size.width;
        } else {
            this._progress.width = this.size.width * this._state.progress / 100;
        }

        this._incomeText.x = (this.size.width - this._incomeText.width) / 2;
    }
}