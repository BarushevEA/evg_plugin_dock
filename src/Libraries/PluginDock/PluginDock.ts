import {IPlugin, IPluginDock, IPluginList, pluginId} from "./env";

export class PluginDock<T> implements IPluginDock<T> {
    private readonly root: T;
    private pluginCase: { [key: string]: IPlugin<T, any> } = {};

    constructor(root: T) {
        this.root = root;
    }

    add(plugin: IPlugin<T, any>): void {
        plugin.setOwner(this.root);
        this.pluginCase[plugin.getId()] = plugin;
    };

    unLink(plugin: IPlugin<T, any>): void {
        const id = plugin.getId();
        if (!this.pluginCase[id]) return;

        this.pluginCase[id].unLink();
        delete this.pluginCase[id];
    };

    destroyPlugin(plugin: IPlugin<T, any>): void {
        this.destroyPluginById(plugin.getId());
    };

    destroy(): void {
        const list = this.getIdList();

        for (let i = 0; i < list.length; i++) {
            const name = list[i];
            this.destroyPluginById(name);
        }
    };

    destroyPluginById(id: string): void {
        if (!this.pluginCase[id]) return;

        this.pluginCase[id].destroy();
        delete this.pluginCase[id];
    };

    getPlugin(id: pluginId): T {
        if (!this.pluginCase[id]) return <any>0;

        return this.pluginCase[id];
    };

    getIdList(): string[] {
        return Object.keys(this.pluginCase);
    };

    getIdsByNames(): IPluginList {
        const list = this.getIdList();
        if (!list || !list.length) return <any>0;

        const rootList: IPluginList = {};
        for (let i = 0; i < list.length; i++) {
            const id = list[i];
            const plugin = this.pluginCase[id];
            if (!rootList[plugin.name]) rootList[plugin.name] = [];

            rootList[plugin.name].push(id);
        }

        return rootList;
    }

    getPluginsByName(name: string): T[] {
        const rootList: IPluginList = this.getIdsByNames();
        if (!rootList || !rootList[name]) return <any>[0];

        const plugins: T[] = [];
        const ids: pluginId[] = rootList[name];

        for (let i = 0; i < ids.length; i++) {
            plugins.push(this.getPlugin(ids[i]));
        }

        return plugins;
    }
}
