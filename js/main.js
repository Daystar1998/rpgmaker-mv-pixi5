//=============================================================================
// main.js
//=============================================================================

if(process.versions["nw-flavor"] === "sdk") {
    require('nw.gui').Window.get().showDevTools();
}

PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
};
