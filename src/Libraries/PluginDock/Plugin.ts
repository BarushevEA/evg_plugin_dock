import {IPlugin, pluginId, STATE} from "./env";

export abstract class Plugin<T, V> implements IPlugin<T, V> {
    private static pluginCounter = 0;
    private readonly id: pluginId = '';
    protected owner: T = <any>0;
    protected additional: V = <any>0;
    protected _state: STATE = STATE.UNDEFINED;
    public readonly numberSeparator = '_plugin#';
    public readonly name: string = '';

    protected constructor(name: string, additional: V) {
        this.name = name;
        this.id = name + this.numberSeparator + Plugin.pluginCounter;
        this.additional = additional;
        Plugin.pluginCounter++;
    }

    get state(){
        return this._state;
    }

    destroy(): void {
        this.unLink();
        this.additional = <any>0;
        this._state = STATE.DESTROYED;
    };

    unLink(): void {
        this.owner = <any>0;
        this._state = STATE.UNLINKED;
    };

    getId(): string {
        return this.id;
    };

    setOwner(root: T): void {
        this.owner = root;
        this._state = STATE.ACTIVE;
        this.onInit(root);
    };

    abstract onInit(root?: T): void;
}
