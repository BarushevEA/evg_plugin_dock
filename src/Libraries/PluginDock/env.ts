export enum STATE {
    ACTIVE = "ACTIVE",
    UNLINKED = "UNLINKED",
    DESTROYED = "DESTROYED",
    UNDEFINED = "UNDEFINED"
}

export type pluginId = string;

export type IPlugin<T, V> = {
    readonly numberSeparator: string;
    readonly state: STATE;
    readonly name: string;
    getId(): string;
    destroy(): void;
    unLink(): void;
    setOwner(root: T): void;
}

export type IPluginList = {
    [rootName: string]: pluginId[];
};

export type IPluginDock<T> = {
    add(plugin: IPlugin<T, any>): void;
    unLink(plugin: IPlugin<T, any>): void;
    destroy(): void;
    destroyPluginById(name: string): void;
    destroyPlugin(plugin: IPlugin<T, any>): void;
    getPlugin(name: string): T;
    getIdList(): string[];
    getIdsByNames(): IPluginList;
    getPluginsByName(name: string): T[];
}
