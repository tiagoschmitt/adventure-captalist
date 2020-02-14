import { DisplayComponent } from "../../../../gameclosure/components/display/DisplayComponent";
import { Graphics, Rectangle, TextStyle, Text } from "pixi.js";
import { GraphicsUtil } from "../../../../gameclosure/utils/graphicsUtil";
import { Money } from "../../../../gameclosure/utils/money";
import { CompanyState } from "../../../store/companyState";
import { Game } from "../../../../gameclosure/game";
import { GameState } from "../../../store/gameState";

export class InvestmentBuyButton extends DisplayComponent {
    public size: Rectangle;

    private _disabled: Graphics;
    private _enabled: Graphics;
    private _price: Text;
    private _unit: Text;
    private _gameState: GameState;
    private _state: CompanyState;

    constructor(id: string) {
        super(id);
    }

    protected draw() {
        this._gameState = Game.store.data as GameState;
        this._state = Game.store.getState(this.id, "companies") as CompanyState;
        this.size = new Rectangle(0, 0, 148, 50);

        this._disabled = GraphicsUtil.drawRect(this.size.width, this.size.height, 0x6a8a94, 1, 0x444444, 5);
        this.content.addChild(this._disabled);

        this._enabled = GraphicsUtil.drawRect(this.size.width, this.size.height, 0xe08b4e, 1, 0x444444, 5);
        this.content.addChild(this._enabled);

        this.createTexts();
        this.addEvents();     
    }

    protected addEvents() {
        this._enabled.interactive = true;
        this._enabled.buttonMode = true;

        this._enabled.on("click", this.onClick.bind(this));
    }

    public update(): void {
        var money: Money = new Money(this._state.currentCost);
        this.updatePrice(money);

        if (this._gameState.total >= this._state.currentCost && this._state.owned > 0) {
            this.enable();
        } else {
            this.disable();
        }
    }

    protected enable(): void {
        this._disabled.visible = false;
        this._enabled.visible = true;
    }

    protected disable(): void {
        this._disabled.visible = true;
        this._enabled.visible = false;
    }

    protected updatePrice(price: Money): void {
        this._price.text = price.formatted;
        this._price.x = this.size.width - this._price.width - 10;
        this._price.y = 5;

        this._unit.text = price.unit.toUpperCase();
        this._unit.x = this.size.width - this._unit.width - 10;
        this._unit.y = 25;
    }

    protected createTexts(): void {
        var style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 15,
            fill: "white"
        });
        
        var buyText:Text = new Text("Buy\nx1", style);
        buyText.x = 10;
        buyText.y = 5;

        this._price = new Text("", style);
        
        style = new TextStyle({
            fontFamily: "Arial Black",
            fontSize: 10,
            fill: "black"
        });

        this._unit = new Text("", style);

        this.content.addChild(buyText, this._price, this._unit);
    }

    private onClick(e: any): void {
        if (this._gameState.total >= this._state.currentCost && this._state.owned > 0) {
            this._state.owned++;

            this._gameState.total -= this._state.currentCost;
        }
    }
}