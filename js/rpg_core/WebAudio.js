//-----------------------------------------------------------------------------
/**
 * The audio object of Web Audio API.
 *
 * @class WebAudio
 * @constructor
 * @param {String} url The url of the audio file
 */
function WebAudio() {
    this.initialize.apply(this, arguments);
}

WebAudio._standAlone = (function (top) {
    return !top.ResourceHandler;
})(this);

WebAudio.prototype.initialize = function (url) {
    url = CS_URL.MapURL(url);
    if (!WebAudio._initialized) {
        WebAudio.initialize();
    }
    this.clear();

    if (!WebAudio._standAlone) {
        this._loader = ResourceHandler.createLoader(url, this._load.bind(this, url), function () {
            this._hasError = true;
        }.bind(this));
    }
    this._load(url);
    this._url = url;
};

WebAudio._masterVolume = 1;
WebAudio._context = null;
WebAudio._masterGainNode = null;
WebAudio._initialized = false;
WebAudio._unlocked = false;

/**
 * Initializes the audio system.
 *
 * @static
 * @method initialize
 * @param {Boolean} noAudio Flag for the no-audio mode
 * @return {Boolean} True if the audio system is available
 */
WebAudio.initialize = function (noAudio) {
    if (!this._initialized) {
        if (!noAudio) {
            this._createContext();
            this._detectCodecs();
            this._createMasterGainNode();
            this._setupEventHandlers();
        }
        this._initialized = true;
    }
    return !!this._context;
};

/**
 * Checks whether the browser can play ogg files.
 *
 * @static
 * @method canPlayOgg
 * @return {Boolean} True if the browser can play ogg files
 */
WebAudio.canPlayOgg = function () {
    if (!this._initialized) {
        this.initialize();
    }
    return !!this._canPlayOgg;
};

/**
 * Checks whether the browser can play m4a files.
 *
 * @static
 * @method canPlayM4a
 * @return {Boolean} True if the browser can play m4a files
 */
WebAudio.canPlayM4a = function () {
    if (!this._initialized) {
        this.initialize();
    }
    return !!this._canPlayM4a;
};

/**
 * Sets the master volume of the all audio.
 *
 * @static
 * @method setMasterVolume
 * @param {Number} value Master volume (min: 0, max: 1)
 */
WebAudio.setMasterVolume = function (value) {
    this._masterVolume = value;
    if (this._masterGainNode) {
        this._masterGainNode.gain.setValueAtTime(this._masterVolume, this._context.currentTime);
    }
};

/**
 * @static
 * @method _createContext
 * @private
 */
WebAudio._createContext = function () {
    try {
        if (typeof AudioContext !== 'undefined') {
            this._context = new AudioContext();
        } else if (typeof webkitAudioContext !== 'undefined') {
            this._context = new webkitAudioContext();
        }
    } catch (e) {
        this._context = null;
    }
};

/**
 * @static
 * @method _detectCodecs
 * @private
 */
WebAudio._detectCodecs = function () {
    const audio = document.createElement('audio');
    if (audio.canPlayType) {
        this._canPlayOgg = audio.canPlayType('audio/ogg');
        this._canPlayM4a = audio.canPlayType('audio/mp4');
    }
};

/**
 * @static
 * @method _createMasterGainNode
 * @private
 */
WebAudio._createMasterGainNode = function () {
    const context = WebAudio._context;
    if (context) {
        this._masterGainNode = context.createGain();
        this._masterGainNode.gain.setValueAtTime(this._masterVolume, context.currentTime);
        this._masterGainNode.connect(context.destination);
    }
};

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
WebAudio._setupEventHandlers = function () {
    const resumeHandler = function () {
        const context = WebAudio._context;
        if (context && context.state === "suspended" && typeof context.resume === "function") {
            context.resume().then(function () {
                WebAudio._onTouchStart();
            });
        } else {
            WebAudio._onTouchStart();
        }
    };
    document.addEventListener("keydown", resumeHandler);
    document.addEventListener("mousedown", resumeHandler);
    document.addEventListener("touchend", resumeHandler);
    document.addEventListener('touchstart', this._onTouchStart.bind(this));
    document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this));
};

/**
 * @static
 * @method _onTouchStart
 * @private
 */
WebAudio._onTouchStart = function () {
    const context = WebAudio._context;
    if (context && !this._unlocked) {
        // Unlock Web Audio on iOS
        const node = context.createBufferSource();
        node.start(0);
        this._unlocked = true;
    }
};

/**
 * @static
 * @method _onVisibilityChange
 * @private
 */
WebAudio._onVisibilityChange = function () {
    if (document.visibilityState === 'hidden') {
        this._onHide();
    } else {
        this._onShow();
    }
};

/**
 * @static
 * @method _onHide
 * @private
 */
WebAudio._onHide = function () {
    if (this._shouldMuteOnHide()) {
        this._fadeOut(1);
    }
};

/**
 * @static
 * @method _onShow
 * @private
 */
WebAudio._onShow = function () {
    if (this._shouldMuteOnHide()) {
        this._fadeIn(0.5);
    }
};

/**
 * @static
 * @method _shouldMuteOnHide
 * @private
 */
WebAudio._shouldMuteOnHide = function () {
    return Utils.isMobileDevice();
};

/**
 * @static
 * @method _fadeIn
 * @param {Number} duration
 * @private
 */
WebAudio._fadeIn = function (duration) {
    if (this._masterGainNode) {
        const gain = this._masterGainNode.gain;
        const currentTime = WebAudio._context.currentTime;
        gain.setValueAtTime(0, currentTime);
        gain.linearRampToValueAtTime(this._masterVolume, currentTime + duration);
    }
};

/**
 * @static
 * @method _fadeOut
 * @param {Number} duration
 * @private
 */
WebAudio._fadeOut = function (duration) {
    if (this._masterGainNode) {
        const gain = this._masterGainNode.gain;
        const currentTime = WebAudio._context.currentTime;
        gain.setValueAtTime(this._masterVolume, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + duration);
    }
};

/**
 * Clears the audio data.
 *
 * @method clear
 */
WebAudio.prototype.clear = function () {
    this.stop();
    this._buffer = null;
    this._sourceNode = null;
    this._gainNode = null;
    this._pannerNode = null;
    this._totalTime = 0;
    this._sampleRate = 0;
    this._loopStart = 0;
    this._loopLength = 0;
    this._startTime = 0;
    this._volume = 1;
    this._pitch = 1;
    this._pan = 0;
    this._endTimer = null;
    this._loadListeners = [];
    this._stopListeners = [];
    this._hasError = false;
    this._autoPlay = false;
};

/**
 * [read-only] The url of the audio file.
 *
 * @property url
 * @type String
 */
Object.defineProperty(WebAudio.prototype, 'url', {
    get: function () {
        return this._url;
    },
    configurable: true
});

/**
 * The volume of the audio.
 *
 * @property volume
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'volume', {
    get: function () {
        return this._volume;
    },
    set: function (value) {
        this._volume = value;
        if (this._gainNode) {
            this._gainNode.gain.setValueAtTime(this._volume, WebAudio._context.currentTime);
        }
    },
    configurable: true
});

/**
 * The pitch of the audio.
 *
 * @property pitch
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'pitch', {
    get: function () {
        return this._pitch;
    },
    set: function (value) {
        if (this._pitch !== value) {
            this._pitch = value;
            if (this.isPlaying()) {
                this.play(this._sourceNode.loop, 0);
            }
        }
    },
    configurable: true
});

/**
 * The pan of the audio.
 *
 * @property pan
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'pan', {
    get: function () {
        return this._pan;
    },
    set: function (value) {
        this._pan = value;
        this._updatePanner();
    },
    configurable: true
});

/**
 * Checks whether the audio data is ready to play.
 *
 * @method isReady
 * @return {Boolean} True if the audio data is ready to play
 */
WebAudio.prototype.isReady = function () {
    return !!this._buffer;
};

/**
 * Checks whether a loading error has occurred.
 *
 * @method isError
 * @return {Boolean} True if a loading error has occurred
 */
WebAudio.prototype.isError = function () {
    return this._hasError;
};

/**
 * Checks whether the audio is playing.
 *
 * @method isPlaying
 * @return {Boolean} True if the audio is playing
 */
WebAudio.prototype.isPlaying = function () {
    return !!this._sourceNode;
};

/**
 * Plays the audio.
 *
 * @method play
 * @param {Boolean} loop Whether the audio data play in a loop
 * @param {Number} offset The start position to play in seconds
 */
WebAudio.prototype.play = function (loop, offset) {
    if (this.isReady()) {
        offset = offset || 0;
        this._startPlaying(loop, offset);
    } else if (WebAudio._context) {
        this._autoPlay = true;
        this.addLoadListener(function () {
            if (this._autoPlay) {
                this.play(loop, offset);
            }
        }.bind(this));
    }
};

/**
 * Stops the audio.
 *
 * @method stop
 */
WebAudio.prototype.stop = function () {
    this._autoPlay = false;
    this._removeEndTimer();
    this._removeNodes();
    if (this._stopListeners) {
        while (this._stopListeners.length > 0) {
            const listener = this._stopListeners.shift();
            listener();
        }
    }
};

/**
 * Performs the audio fade-in.
 *
 * @method fadeIn
 * @param {Number} duration Fade-in time in seconds
 */
WebAudio.prototype.fadeIn = function (duration) {
    if (this.isReady()) {
        if (this._gainNode) {
            const gain = this._gainNode.gain;
            const currentTime = WebAudio._context.currentTime;
            gain.setValueAtTime(0, currentTime);
            gain.linearRampToValueAtTime(this._volume, currentTime + duration);
        }
    } else if (this._autoPlay) {
        this.addLoadListener(function () {
            this.fadeIn(duration);
        }.bind(this));
    }
};

/**
 * Performs the audio fade-out.
 *
 * @method fadeOut
 * @param {Number} duration Fade-out time in seconds
 */
WebAudio.prototype.fadeOut = function (duration) {
    if (this._gainNode) {
        const gain = this._gainNode.gain;
        const currentTime = WebAudio._context.currentTime;
        gain.setValueAtTime(this._volume, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + duration);
    }
    this._autoPlay = false;
};

/**
 * Gets the seek position of the audio.
 *
 * @method seek
 */
WebAudio.prototype.seek = function () {
    if (WebAudio._context) {
        let pos = (WebAudio._context.currentTime - this._startTime) * this._pitch;
        if (this._loopLength > 0) {
            while (pos >= this._loopStart + this._loopLength) {
                pos -= this._loopLength;
            }
        }
        return pos;
    } else {
        return 0;
    }
};

/**
 * Add a callback function that will be called when the audio data is loaded.
 *
 * @method addLoadListener
 * @param {Function} listener The callback function
 */
WebAudio.prototype.addLoadListener = function (listener) {
    this._loadListeners.push(listener);
};

/**
 * Add a callback function that will be called when the playback is stopped.
 *
 * @method addStopListener
 * @param {Function} listener The callback function
 */
WebAudio.prototype.addStopListener = function (listener) {
    this._stopListeners.push(listener);
};

/**
 * @method _load
 * @param {String} url
 * @private
 */
WebAudio.prototype._load = function (url) {
    if (WebAudio._context) {
        const xhr = new XMLHttpRequest();
        if (Decrypter.hasEncryptedAudio) url = Decrypter.extToEncryptExt(url);
        else url = CS_URL.MapURL(url);
        xhr.open('GET', url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {
            if (xhr.status < 400) {
                this._onXhrLoad(xhr);
            }
        }.bind(this);
        xhr.onerror = this._loader || function () { this._hasError = true; }.bind(this);
        xhr.send();
    }
};

/**
 * @method _onXhrLoad
 * @param {XMLHttpRequest} xhr
 * @private
 */
WebAudio.prototype._onXhrLoad = function (xhr) {
    let array = xhr.response;
    if (Decrypter.hasEncryptedAudio) array = Decrypter.decryptArrayBuffer(array, "_onXhrLoad");
    this._readLoopComments(new Uint8Array(array));
    WebAudio._context.decodeAudioData(array, function (buffer) {
        this._buffer = buffer;
        this._totalTime = buffer.duration;
        if (this._loopLength > 0 && this._sampleRate > 0) {
            this._loopStart /= this._sampleRate;
            this._loopLength /= this._sampleRate;
        } else {
            this._loopStart = 0;
            this._loopLength = this._totalTime;
        }
        this._onLoad();
    }.bind(this));
};

/**
 * @method _startPlaying
 * @param {Boolean} loop
 * @param {Number} offset
 * @private
 */
WebAudio.prototype._startPlaying = function (loop, offset) {
    if (this._loopLength > 0) {
        while (offset >= this._loopStart + this._loopLength) {
            offset -= this._loopLength;
        }
    }
    this._removeEndTimer();
    this._removeNodes();
    this._createNodes();
    this._connectNodes();
    this._sourceNode.loop = loop;
    this._sourceNode.start(0, offset);
    this._startTime = WebAudio._context.currentTime - offset / this._pitch;
    this._createEndTimer();
};

/**
 * @method _createNodes
 * @private
 */
WebAudio.prototype._createNodes = function () {
    const context = WebAudio._context;
    this._sourceNode = context.createBufferSource();
    this._sourceNode.buffer = this._buffer;
    this._sourceNode.loopStart = this._loopStart;
    this._sourceNode.loopEnd = this._loopStart + this._loopLength;
    this._sourceNode.playbackRate.setValueAtTime(this._pitch, context.currentTime);
    this._gainNode = context.createGain();
    this._gainNode.gain.setValueAtTime(this._volume, context.currentTime);
    this._pannerNode = context.createPanner();
    this._pannerNode.panningModel = 'equalpower';
    this._updatePanner();
};

/**
 * @method _connectNodes
 * @private
 */
WebAudio.prototype._connectNodes = function () {
    this._sourceNode.connect(this._gainNode);
    this._gainNode.connect(this._pannerNode);
    this._pannerNode.connect(WebAudio._masterGainNode);
};

/**
 * @method _removeNodes
 * @private
 */
WebAudio.prototype._removeNodes = function () {
    if (this._sourceNode) {
        this._sourceNode.stop(0);
        this._sourceNode = null;
        this._gainNode = null;
        this._pannerNode = null;
    }
};

/**
 * @method _createEndTimer
 * @private
 */
WebAudio.prototype._createEndTimer = function () {
    if (this._sourceNode && !this._sourceNode.loop) {
        const endTime = this._startTime + this._totalTime / this._pitch;
        const delay = endTime - WebAudio._context.currentTime;
        this._endTimer = setTimeout(function () {
            this.stop();
        }.bind(this), delay * 1000);
    }
};

/**
 * @method _removeEndTimer
 * @private
 */
WebAudio.prototype._removeEndTimer = function () {
    if (this._endTimer) {
        clearTimeout(this._endTimer);
        this._endTimer = null;
    }
};

/**
 * @method _updatePanner
 * @private
 */
WebAudio.prototype._updatePanner = function () {
    if (this._pannerNode) {
        const x = this._pan;
        const z = 1 - Math.abs(x);
        this._pannerNode.setPosition(x, 0, z);
    }
};

/**
 * @method _onLoad
 * @private
 */
WebAudio.prototype._onLoad = function () {
    while (this._loadListeners.length > 0) {
        const listener = this._loadListeners.shift();
        listener();
    }
};

/**
 * @method _readLoopComments
 * @param {Uint8Array} array
 * @private
 */
WebAudio.prototype._readLoopComments = function (array) {
    this._readOgg(array);
    this._readMp4(array);
};

/**
 * @method _readOgg
 * @param {Uint8Array} array
 * @private
 */
WebAudio.prototype._readOgg = function (array) {
    let index = 0;
    while (index < array.length) {
        if (this._readFourCharacters(array, index) === 'OggS') {
            index += 26;
            let vorbisHeaderFound = false;
            const numSegments = array[index++];
            const segments = [];
            for (let i = 0; i < numSegments; i++) {
                segments.push(array[index++]);
            }
            for (let i = 0; i < numSegments; i++) {
                if (this._readFourCharacters(array, index + 1) === 'vorb') {
                    const headerType = array[index];
                    if (headerType === 1) {
                        this._sampleRate = this._readLittleEndian(array, index + 12);
                    } else if (headerType === 3) {
                        this._readMetaData(array, index, segments[i]);
                    }
                    vorbisHeaderFound = true;
                }
                index += segments[i];
            }
            if (!vorbisHeaderFound) {
                break;
            }
        } else {
            break;
        }
    }
};

/**
 * @method _readMp4
 * @param {Uint8Array} array
 * @private
 */
WebAudio.prototype._readMp4 = function (array) {
    if (this._readFourCharacters(array, 4) === 'ftyp') {
        let index = 0;
        while (index < array.length) {
            const size = this._readBigEndian(array, index);
            const name = this._readFourCharacters(array, index + 4);
            if (name === 'moov') {
                index += 8;
            } else {
                if (name === 'mvhd') {
                    this._sampleRate = this._readBigEndian(array, index + 20);
                }
                if (name === 'udta' || name === 'meta') {
                    this._readMetaData(array, index, size);
                }
                index += size;
                if (size <= 1) {
                    break;
                }
            }
        }
    }
};

/**
 * @method _readMetaData
 * @param {Uint8Array} array
 * @param {Number} index
 * @param {Number} size
 * @private
 */
WebAudio.prototype._readMetaData = function (array, index, size) {
    for (let i = index; i < index + size - 10; i++) {
        if (this._readFourCharacters(array, i) === 'LOOP') {
            let text = '';
            while (array[i] > 0) {
                text += String.fromCharCode(array[i++]);
            }
            if (text.match(/LOOPSTART=([0-9]+)/)) {
                this._loopStart = parseInt(RegExp.$1);
            }
            if (text.match(/LOOPLENGTH=([0-9]+)/)) {
                this._loopLength = parseInt(RegExp.$1);
            }
            if (text === 'LOOPSTART' || text === 'LOOPLENGTH') {
                let text2 = '';
                i += 16;
                while (array[i] > 0) {
                    text2 += String.fromCharCode(array[i++]);
                }
                if (text === 'LOOPSTART') {
                    this._loopStart = parseInt(text2);
                } else {
                    this._loopLength = parseInt(text2);
                }
            }
        }
    }
};

/**
 * @method _readLittleEndian
 * @param {Uint8Array} array
 * @param {Number} index
 * @private
 */
WebAudio.prototype._readLittleEndian = function (array, index) {
    return (array[index + 3] * 0x1000000 + array[index + 2] * 0x10000 +
        array[index + 1] * 0x100 + array[index + 0]);
};

/**
 * @method _readBigEndian
 * @param {Uint8Array} array
 * @param {Number} index
 * @private
 */
WebAudio.prototype._readBigEndian = function (array, index) {
    return (array[index + 0] * 0x1000000 + array[index + 1] * 0x10000 +
        array[index + 2] * 0x100 + array[index + 3]);
};

/**
 * @method _readFourCharacters
 * @param {Uint8Array} array
 * @param {Number} index
 * @private
 */
WebAudio.prototype._readFourCharacters = function (array, index) {
    let string = '';
    for (let i = 0; i < 4; i++) {
        string += String.fromCharCode(array[index + i]);
    }
    return string;
};
