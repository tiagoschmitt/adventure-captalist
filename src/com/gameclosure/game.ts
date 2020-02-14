import { DisplaylableFactory } from "./factories/display/displayableFactory";
import { Application, ApplicationOptions } from "pixi.js";
import { Router } from "./router/router";
import { Store } from "./store/store";
import { IState } from "./store/iState";
import { Asset } from "./utils/asset";
import { ImageFactory } from "./factories/imageFactory";


export class Game {
    private static _app: Application;
    private static _router: Router;
    private static _store: Store<IState>;
    private static _diplayFactory: DisplaylableFactory;
    private static _imageFactory: ImageFactory;

    public static init(displayFactory: DisplaylableFactory, router?: Router, store?: Store<IState>) {
        Game._diplayFactory = displayFactory;
        Game._router = router;
        Game._store = store;

        Game._imageFactory = new ImageFactory();
    }
    
    public static get app(): Application {
        return Game._app;
    }

    public static get router(): Router {
        return Game._router;
    }

    public static get store(): Store<IState> {
        return Game._store;
    }

    public static  get displayFactory(): DisplaylableFactory {
        return Game._diplayFactory;
    }

    public static  get imageFactory(): ImageFactory {
        return Game._imageFactory;
    }

    public static setupRender(options: ApplicationOptions) {
        Game._app = new Application(options);

        document.body.appendChild(this._app.view);

        this._app.view.addEventListener('contextmenu', (e:any) => {
            e.preventDefault();
        });
    }

    public static async loadAssets(assets: Asset[]): Promise<any> {
        var loader:PIXI.loaders.Loader = new PIXI.loaders.Loader();

        for (var asset of assets) {
            loader.add(asset.id, asset.url);
        }

        return new Promise((resolve) => {
            loader.load((loader: PIXI.loaders.Loader, resources: any) => {
                resolve(resources);
            });
        })
    }
}