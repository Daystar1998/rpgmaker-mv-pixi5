//-----------------------------------------------------------------------------
/**
 * The static class that handles mapping case insensitive URL calls to case
 * sensitive file names
 *
 * @class CS_URL
 */
function CS_URL() {
    throw new Error('This is a static class');
}

CS_URL.urlMap = {};
CS_URL.absolutePrefix = "";

/**
 * Initializes the CS_URL static object
 * @static
 * @method Initialize
 */
CS_URL.Initialize = function () {
    try {
        let platform;
        try {
            CS_URL.absolutePrefix = require('path').posix.dirname(window.location.pathname);
            platform = nw.process.platform;
        } catch (e) {
            CS_URL.MapURL = function (url) { return url; };
            Utils.isNwjs = function () { return false; };
            return;
        }
        if (platform !== "linux" && platform !== "android") {
            CS_URL.MapURL = function (url) { return url; };
        }
        else {
            CS_URL.InitializeMap(nw.__dirname, "/");
        }
    } catch (e) {
        CS_URL.MapURL = function (url) { return url; };
        return;
    }
};

/**
 * Initializes the file map (called recursively)
 * @static
 * @method InitializeMap
 * @param {String} baseSystemPath path on the actual machine (OS specific path)
 * @param {String} baseFilePath path in the URL (POSIX path regardless of OS)
 */
CS_URL.InitializeMap = function (baseSystemPath, baseFilePath) {
    const fs = require('fs');
    const path = require('path');
    const items = fs.readdirSync(baseSystemPath, { withFileTypes: true }).reverse();
    for (const entry of items) {
        let isDir = entry.isDirectory();
        if (entry.isSymbolicLink()) {
            const realItem = path.join(baseSystemPath, fs.readlinkSync(path.join(baseSystemPath, entry.name)));
            isDir = fs.statSync(realItem).isDirectory();
        }
        if (isDir) {
            const folderName = entry.name;
            const folderPathPosix = path.posix.join(baseSystemPath, folderName);
            const folderPath = path.join(baseSystemPath, folderName);
            CS_URL.urlMap[folderPathPosix] = folderPathPosix;
            CS_URL.urlMap[folderPathPosix.toLowerCase()] = folderPathPosix;
            CS_URL.urlMap[folderPath] = folderPathPosix;
            CS_URL.urlMap[folderPathPosix + "/"] = folderPathPosix + "/";
            CS_URL.urlMap[folderPathPosix.toLowerCase() + "/"] = folderPathPosix + "/";
            CS_URL.urlMap[folderPath] = folderPathPosix + "/";
            CS_URL.InitializeMap(
                path.join(baseSystemPath, entry.name),
                path.posix.join(baseFilePath, entry.name));
        } else {
            const fileName = entry.name;
            let ext = path.extname(fileName);
            const filePathPosix = path.posix.join(baseFilePath, path.basename(fileName, ext));
            const filePath = path.join(baseFilePath, path.basename(fileName, ext));
            CS_URL.urlMap[filePathPosix + ext] = filePathPosix + ext;
            CS_URL.urlMap[filePathPosix.toLowerCase() + ext] = filePathPosix + ext;
            CS_URL.urlMap[filePath + ext] = filePathPosix + ext;
            // if we find an encrypted file, add the decrypted name to the list
            // of things to look for
            if (ext === ".rpgmvo") ext = ".ogg";
            else if (ext === ".rpgmvm") ext = ".m4a";
            else if (ext === ".rpgmvp") ext = ".png";
            else if (ext === ".webp") {
                CS_URL.urlMap[filePathPosix + ".png"] = filePathPosix + ext;
                CS_URL.urlMap[filePathPosix.toLowerCase() + ".png"] = filePathPosix + ext;
                CS_URL.urlMap[filePath + ".png"] = filePathPosix + ext;
                continue;
            }
            else { continue; }
            CS_URL.urlMap[filePathPosix + ext] = filePathPosix + ext;
            CS_URL.urlMap[filePathPosix.toLowerCase() + ext] = filePathPosix + ext;
            CS_URL.urlMap[filePath + ext] = filePathPosix + ext;
        }
    }
};

/**
 * Maps a case insensitive URL to a case sensitive one
 * @static
 * @method MapURL
 * @param {String} url
 * @return {String}
 */
CS_URL.MapURL = function (url) {
    let item = url;
    // URLs follow posix rules for paths regardless of platform
    const pathUtils = require('path').posix;
    try {
        item = new URL(item).pathname;
    } catch (e) {
    }
    if (!pathUtils.isAbsolute(item)) {
        item = pathUtils.join(CS_URL.absolutePrefix, item);
    }

    let result = CS_URL.urlMap[item];
    if (result) { return result; }
    // You can enable logging here to find files that have the wrong case
    //console.log("File \"" + item + "\" not found, trying lowercase");
    result = CS_URL.urlMap[item.toLowerCase()];
    if (result) { return result; }
    if (url !== decodeURIComponent(url)) { return CS_URL.MapURL(decodeURIComponent(url)); }
    throw new Error("Missing Image: " + url);
    //console.log("\"" + item + "\" still not found giving up");
    return url;
};

CS_URL.Initialize();
