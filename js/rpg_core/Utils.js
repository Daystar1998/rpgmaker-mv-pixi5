//-----------------------------------------------------------------------------
/**
 * The static class that defines utility methods.
 *
 * @class Utils
 */
function Utils() {
    throw new Error('This is a static class');
}

/**
 * The name of the RPG Maker. 'MV' in the current version.
 *
 * @static
 * @property RPGMAKER_NAME
 * @type String
 * @final
 */
Utils.RPGMAKER_NAME = 'MV';

/**
 * The version of the RPG Maker.
 *
 * @static
 * @property RPGMAKER_VERSION
 * @type String
 * @final
 */
Utils.RPGMAKER_VERSION = "1.6.2.2";

/**
 * Checks whether the option is in the query string.
 *
 * @static
 * @method isOptionValid
 * @param {String} name The option name
 * @return {Boolean} True if the option is in the query string
 */
Utils.isOptionValid = function (name) {
    if (location.search.slice(1).split('&').contains(name)) {
        return true;
    }
    if (typeof nw !== "undefined" && nw.App.argv.length > 0 && nw.App.argv[0].split('&').contains(name)) {
        return true;
    }
    return false;
};

/**
 * Checks whether the platform is NW.js.
 *
 * @static
 * @method isNwjs
 * @return {Boolean} True if the platform is NW.js
 */
Utils.isNwjs = function () {
    return typeof require === 'function' && typeof process === 'object';
};

/**
 * Checks whether the platform is a mobile device.
 *
 * @static
 * @method isMobileDevice
 * @return {Boolean} True if the platform is a mobile device
 */
Utils.isMobileDevice = function () {
    const r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    if (!!navigator.userAgent.match(r)) {
        Utils.isMobileDevice = function () { return true; };
        return true;
    }

    Utils.isMobileDevice = function () { return false; };
    return false;
};

/**
 * Checks whether the browser is Mobile Safari.
 *
 * @static
 * @method isMobileSafari
 * @return {Boolean} True if the browser is Mobile Safari
 */
Utils.isMobileSafari = function () {
    const agent = navigator.userAgent;
    if (!!(agent.match(/iPhone|iPad|iPod/) && agent.match(/AppleWebKit/) &&
        !agent.match('CriOS'))) {
        Utils.isMobileSafari = function () { return true; };
        return true;
    }
    Utils.isMobileSafari = function () { return false; };
    return false;
};

/**
 * Checks whether the browser is Android Chrome.
 *
 * @static
 * @method isAndroidChrome
 * @return {Boolean} True if the browser is Android Chrome
 */
Utils.isAndroidChrome = function () {
    const agent = navigator.userAgent;
    return !!(agent.match(/Android/) && agent.match(/Chrome/));
};

/**
 * Checks whether the browser can read files in the game folder.
 *
 * @static
 * @method canReadGameFiles
 * @return {Boolean} True if the browser can read files in the game folder
 */
Utils.canReadGameFiles = function () {
    const scripts = document.getElementsByTagName('script');
    const lastScript = scripts[scripts.length - 1];
    const xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', CS_URL.MapURL(lastScript.src));
        xhr.overrideMimeType('text/javascript');
        xhr.send();
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Makes a CSS color string from RGB values.
 *
 * @static
 * @method rgbToCssColor
 * @param {Number} r The red value in the range (0, 255)
 * @param {Number} g The green value in the range (0, 255)
 * @param {Number} b The blue value in the range (0, 255)
 * @return {String} CSS color string
 */
Utils.rgbToCssColor = function (r, g, b) {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};

Utils._id = 1;
Utils.generateRuntimeId = function () {
    return Utils._id++;
};

Utils._supportPassiveEvent = null;
/**
 * Test this browser support passive event feature
 * 
 * @static
 * @method isSupportPassiveEvent
 * @return {Boolean} this browser support passive event or not
 */
Utils.isSupportPassiveEvent = function () {
    if (typeof Utils._supportPassiveEvent === "boolean") {
        return Utils._supportPassiveEvent;
    }
    // test support passive event
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
    let passive = false;
    const options = Object.defineProperty({}, "passive", {
        get: function () { passive = true; }
    });
    window.addEventListener("test", null, options);
    Utils._supportPassiveEvent = passive;
    return passive;
};
