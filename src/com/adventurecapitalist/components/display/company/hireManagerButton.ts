import { DisplayComponent } from "../../../../gameclosure/components/display/DisplayComponent";
import { Graphics, Rectangle, TextStyle, Text } from "pixi.js";
import { GraphicsUtil } from "../../../../gameclosure/utils/graphicsUtil";
import { CompanyState } from "../../../store/companyState";
import { Game } from "../../../../gameclosure/game";
import { GameState } from "../../../store/gameState";
import { Money } from "../../../../gameclosure/utils/money";

export class HireManagerButton extends DisplayComponent {
    public size: Rectangle;

    private _disabled: Graphics;
    private _enabled: Graphics;
    private _gameState: GameState;
    private _state: CompanyState;

    constructor(id: string) {
        super(id);
    }

    protected draw() {
        this._gameState = Game.store.data as GameState;
        this._state = Game.store.getState(this.id, "companies") as CompanyState;
        this.size = new Rectangle(0, 0, 85, 85);

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
         if (this._gameState.total >= this._state.managerCost && !this._state.hasManager) {
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

    protected createTexts(): void {
        var style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 12,
            fill: "white",
        });
        
        var money: Money = new Money(this._state.managerCost);
        var text:Text;

        text = new Text("BUY", style);
        this.content.addChild(text);
        text.x = (this.content.width - text.width) / 2;
        text.y = 5;

        text = new Text("MANAGER", style);
        this.content.addChild(text);
        text.x = (this.content.width - text.width) / 2;
        text.y = 20;

        text = new Text(money.formatted + " " + money.unit, style);
        this.content.addChild(text);
        text.x = (this.content.width - text.width) / 2;
        text.y = 45;
    }

    private onClick(e: any): void {
        this._state.hasManager = true;

        this._gameState.total -= this._state.managerCost;
    }
}