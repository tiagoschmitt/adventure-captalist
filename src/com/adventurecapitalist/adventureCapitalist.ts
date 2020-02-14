import { PixiPlugin } from "gsap/PixiPlugin";
import { Game } from "../gameclosure/game";
import { Router } from "../gameclosure/router/router";
import { ImageFactory } from "../gameclosure/factories/imageFactory";
import { DisplayComponentFactory } from "../gameclosure/factories/display/displayComponentFactory";
import { Store } from "../gameclosure/store/store";
import { GameState } from "./store/gameState";
import { RouterOptionType } from "../gameclosure/router/routerOption";
import { Intro } from "./views/intro";
import { Companies } from "./views/companies";
import { Managers } from "./views/managers";
import { CompanyManager } from "./managers/companyManager";
import { LocalStore } from "../gameclosure/store/localStore";

export class AdventureCapitalist {
    private _storage: LocalStore;
    private _companyManager: CompanyManager;

    constructor() {
        gsap.registerPlugin(PixiPlugin);
        this.startGame();
    }

    private async startGame() {
        var resources: any = 
            await Game.loadAssets([{
                id: "sprites",
                url: "./assets/sprites.json"
            }, {
                id: "config",
                url: "./assets/config.json"
            }
        ]);

        Game.setupRender({ 
            width: 472, 
            height: 840,                       
            antialias: true, 
            transparent: false, 
            resolution: 1,
            backgroundColor: 0xFFFFFF,
        });

        var displayFactory: DisplayComponentFactory = this.configDisplayFactory();
        var router: Router = this.configRouter();
        var store: Store<GameState> = this.configStore(resources.config);
        
        Game.init(displayFactory, router, store);
        router.init();

        this._companyManager = new CompanyManager();

        this.startTick();
    }

    private startTick() {
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));

        Game.app.ticker.add(this.update.bind(this));
    }

    private update() {
        this._companyManager.update();
        Game.router.update();
        Game.store.commit();
    }

    private configDisplayFactory() {
        return new DisplayComponentFactory(new ImageFactory());
    }

    private configStore(config: any):Store<GameState> {
        this._storage = new LocalStore("adventure", 2);
        var gameState: GameState = this._storage.retrive() || config.data;

        var store:Store<GameState> = new Store<GameState>(gameState);
        store.storage = this._storage;

        return store;
    }

    private configRouter(): Router {
        return new Router(
            Game.app.stage, 
            [{
                isDefault: true,
                path: "intro",
                type: RouterOptionType.NORMAL,
                component: Intro
            }, {
                path: "companies",
                type: RouterOptionType.NORMAL,
                component: Companies
            }, {
                path: "managers",
                type: RouterOptionType.MODAL,
                component: Managers
            }
        ]);
    }

    private resize() {
        Game.app.renderer.view.style.position = 'absolute';
        Game.app.renderer.view.style.left = ((window.innerWidth - Game.app.renderer.width) >> 1) + 'px';
        Game.app.renderer.view.style.top = ((window.innerHeight - Game.app.renderer.height) >> 1) + 'px';
    } 
}