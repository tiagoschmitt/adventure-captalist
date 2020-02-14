import { DisplayComponent } from "../../../../gameclosure/components/display/DisplayComponent";
import { Graphics, TextStyle, Text } from "pixi.js";
import { GraphicsUtil } from "../../../../gameclosure/utils/graphicsUtil";
import { GameState } from "../../../store/gameState";
import { CompanyState } from "../../../store/companyState";
import { Game } from "../../../../gameclosure/game";
import { Money } from "../../../../gameclosure/utils/money";

export class BuyButton extends DisplayComponent {
    private _gameState: GameState;
    private _state: CompanyState;
    
    private _enabledBg: Graphics;
    private _disableBg: Graphics;

    constructor(id?: string) {
        super(id);
    }

    public draw(): void {
        this._gameState = Game.store.data as GameState;
        this._state = Game.store.getState(this.id, "companies") as CompanyState;

        this._disableBg = GraphicsUtil.drawRect(200, 70, 0x7c989c, 1, 0x444444, 5);
        this.content.addChild(this._disableBg);

        this._enabledBg = GraphicsUtil.drawRect(200, 70, 0xebb734, 1, null, 5);
        this._enabledBg.buttonMode = true;
        this._enabledBg.interactive = true;
        this.content.addChild(this._enabledBg);
        
        var style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 20,
            fill: "black"
        });
        
        var buyText: Text = new Text("BUY", style);
        buyText.x = (this.content.width - buyText.width) / 2;
        buyText.y = (this.content.height - buyText.height) / 2 - 20;

        style = style.clone();
        style.fontSize = 15;

        var investmentName: Text = new Text(this._state.name, style);
        investmentName.x = (this.content.width - investmentName.width) / 2;
        investmentName.y = (this.content.height - investmentName.height) / 2;

        var costMoney: Money = new Money(this._state.initialCost);
        var cost: Text = new Text(costMoney.formatted + " " + costMoney.unit, style);
        cost.x = (this.content.width - cost.width) / 2;
        cost.y = (this.content.height - cost.height) / 2 + 20;

        this.content.addChild(buyText, investmentName, cost);

        this._enabledBg.on("click", this.onClickBuy.bind(this));
    }

    public update(): void {
        if (this._state.owned == 0) {
            this.showButton(true);
        } else {
            this.showButton(false);
        }

        if (this._state.initialCost <= this._gameState.total) {
            this.enable(true);
        } else {
            this.enable(false);
        }
    }

    private showButton(show: boolean): void {
        if (show) {
            this.content.visible = true;
        } else {
            this.content.visible = false;
        }
    }

    private enable(enabled: boolean): void {
        this._enabledBg.visible = false;
        this._disableBg.visible = false;

        if (enabled) {
            this._enabledBg.visible = true;
        } else {
            this._disableBg.visible = true;
        }
    }

    private onClickBuy(e: any): void {
        this._gameState.total -= this._state.initialCost;
        this._state.owned++;
    }
}