//-----------------------------------------------------------------------------
// PluginManager
//
// The static class that manages the plugins.

function PluginManager() {
    throw new Error('This is a static class');
}

PluginManager._path = 'js/plugins/';
PluginManager._scripts = [];
PluginManager._errorUrls = [];
PluginManager._parameters = {};

PluginManager._ignoredPlugins = [
    "CaeF_restoreMoveIndex"
];

PluginManager.setup = function (plugins) {
    plugins.forEach(function (plugin) {

        if(this._ignoredPlugins.contains(plugin.name))
            return;

        if (plugin.status && !this._scripts.contains(plugin.name)) {
            this.setParameters(plugin.name, plugin.parameters);
            this.loadScript(plugin.name + '.js');
            this._scripts.push(plugin.name);
        }
    }, this);
};

PluginManager.checkErrors = function () {
    const url = this._errorUrls.shift();
    if (url) {
        throw new Error('Failed to load: ' + url);
    }
};

PluginManager.parameters = function (name) {
    return this._parameters[name.toLowerCase()] || {};
};

PluginManager.setParameters = function (name, parameters) {
    this._parameters[name.toLowerCase()] = parameters;
};

PluginManager.loadScript = function (name) {
    const url = CS_URL.MapURL(this._path + name);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = false;
    script.onerror = this.onError.bind(this);
    script._url = url;
    document.body.appendChild(script);
};

PluginManager.onError = function (e) {
    this._errorUrls.push(e.target._url);
};
