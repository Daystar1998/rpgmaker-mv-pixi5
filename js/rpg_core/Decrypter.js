//-----------------------------------------------------------------------------
function Decrypter() {
    throw new Error('This is a static class');
}

Decrypter.hasEncryptedImages = false;
Decrypter.hasEncryptedAudio = false;
Decrypter._requestImgFile = [];
Decrypter._headerlength = 16;
Decrypter._xhrOk = 400;
Decrypter._encryptionKey = "";
// Must be kept lowercase
Decrypter._ignoreList = [
    "img/system/window.png"
];
Decrypter.SIGNATURE = "5250474d56000000";
Decrypter.VER = "000301";
Decrypter.REMAIN = "0000000000";

Decrypter.checkImgIgnore = function (url) {
    for (let cnt = 0; cnt < this._ignoreList.length; cnt++) {
        const lc_url = url.toLowerCase();
        if (lc_url.endsWith(this._ignoreList[cnt])) return true;
    }
    return false;
};

Decrypter.decryptImg = function (url, bitmap) {
    const orig_url = url;
    url = this.extToEncryptExt(url);

    const requestFile = new XMLHttpRequest();
    requestFile.open("GET", url);
    requestFile.responseType = "arraybuffer";
    requestFile.send();

    requestFile.onload = function () {
        if (this.status < Decrypter._xhrOk) {
            const arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response, orig_url);
            bitmap._image.src = Decrypter.createBlobUrl(arrayBuffer);
            bitmap._image.addEventListener('load', bitmap._loadListener = Bitmap.prototype._onLoad.bind(bitmap));
            bitmap._image.addEventListener('error', bitmap._errorListener = bitmap._loader || Bitmap.prototype._onError.bind(bitmap));
        }
    };

    requestFile.onerror = function () {
        if (bitmap._loader) {
            bitmap._loader();
        } else {
            bitmap._onError();
        }
    };
};

Decrypter.cutArrayHeader = function (arrayBuffer, length) {
    return arrayBuffer.slice(length);
};

Decrypter.decryptArrayBuffer = function (arrayBuffer, url) {
    if (!arrayBuffer) return null;
    const header = new Uint8Array(arrayBuffer, 0, this._headerlength);

    const ref = this.SIGNATURE + this.VER + this.REMAIN;
    const refBytes = new Uint8Array(16);
    for (let i = 0; i < this._headerlength; i++) {
        refBytes[i] = parseInt("0x" + ref.substr(i * 2, 2), 16);
    }
    for (let i = 0; i < this._headerlength; i++) {
        if (header[i] !== refBytes[i]) {
            throw new Error("Header is wrong: " + url);
        }
    }

    arrayBuffer = this.cutArrayHeader(arrayBuffer, Decrypter._headerlength);
    const view = new DataView(arrayBuffer);
    this.readEncryptionkey();
    if (arrayBuffer) {
        const byteArray = new Uint8Array(arrayBuffer);
        for (i = 0; i < this._headerlength; i++) {
            byteArray[i] = byteArray[i] ^ parseInt(Decrypter._encryptionKey[i], 16);
            view.setUint8(i, byteArray[i]);
        }
    }

    return arrayBuffer;
};

Decrypter.createBlobUrl = function (arrayBuffer) {
    const blob = new Blob([arrayBuffer]);
    return window.URL.createObjectURL(blob);
};

Decrypter.extToEncryptExt = function (url) {
    let ext;
    try {
        const path = require('path').posix;
        ext = path.extname(url);
        let newExt = ext;

        if (ext === ".ogg" && Decrypter.hasEncryptedAudio) newExt = ".rpgmvo";
        else if (ext === ".m4a" && Decrypter.hasEncryptedImages) newExt = ".rpgmvm";
        else if (ext === ".png" && Decrypter.hasEncryptedImages) newExt = ".rpgmvp";

        return CS_URL.MapURL(path.join(path.dirname(url), path.basename(url, ext) + newExt));
    } catch (e) {
        ext = url.split('.').pop();
        let encryptedExt = ext;

        if (ext === "ogg") encryptedExt = ".rpgmvo";
        else if (ext === "m4a") encryptedExt = ".rpgmvm";
        else if (ext === "png") encryptedExt = ".rpgmvp";
        else encryptedExt = ext;

        return url.slice(0, url.lastIndexOf(ext) - 1) + encryptedExt;
    }
};

Decrypter.readEncryptionkey = function () {
    this._encryptionKey = $dataSystem.encryptionKey.split(/(.{2})/).filter(Boolean);
};
