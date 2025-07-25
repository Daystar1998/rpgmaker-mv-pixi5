//-----------------------------------------------------------------------------
/**
 * The layer which contains game windows.
 *
 * @class WindowLayer
 * @constructor
 */
function WindowLayer() {
    this.initialize.apply(this, arguments);
}

WindowLayer.prototype = Object.create(PIXI.Container.prototype);
WindowLayer.prototype.constructor = WindowLayer;

WindowLayer.prototype.initialize = function () {
    PIXI.Container.call(this);
    this._width = 0;
    this._height = 0;
    this._tempCanvas = null;
    this._translationMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    //temporary fix for memory leak bug
    this.on('removed', this.onRemoveAsAChild);
};

WindowLayer.prototype.onRemoveAsAChild = function () {
    this.removeChildren();
};

/**
 * The width of the window layer in pixels.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(WindowLayer.prototype, 'width', {
    get: function () {
        return this._width;
    },
    set: function (value) {
        this._width = value;
    },
    configurable: true
});

/**
 * The height of the window layer in pixels.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(WindowLayer.prototype, 'height', {
    get: function () {
        return this._height;
    },
    set: function (value) {
        this._height = value;
    },
    configurable: true
});

/**
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the window layer
 * @param {Number} y The y coordinate of the window layer
 * @param {Number} width The width of the window layer
 * @param {Number} height The height of the window layer
 */
WindowLayer.prototype.move = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

/**
 * Updates the window layer for each frame.
 *
 * @method update
 */
WindowLayer.prototype.update = function () {
    this.children.forEach(function (child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * @method _renderCanvas
 * @param {PIXI.CanvasRenderer} renderSession
 * @private
 */
WindowLayer.prototype._renderCanvas = function (renderer) {
    if (!this.visible || !this.renderable) {
        return;
    }

    if (!this._tempCanvas) {
        this._tempCanvas = document.createElement('canvas');
    }

    this._tempCanvas.width = Graphics.width;
    this._tempCanvas.height = Graphics.height;

    const realCanvasContext = renderer.context;
    const context = this._tempCanvas.getContext('2d');

    context.save();
    context.clearRect(0, 0, Graphics.width, Graphics.height);
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.closePath();
    context.clip();

    renderer.context = context;

    for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        if (child._isWindow && child.visible && child.openness > 0) {
            this._canvasClearWindowRect(renderer, child);
            context.save();
            child.renderCanvas(renderer);
            context.restore();
        }
    }

    context.restore();

    renderer.context = realCanvasContext;
    renderer.context.setTransform(1, 0, 0, 1, 0, 0);
    renderer.context.globalCompositeOperation = 'source-over';
    renderer.context.globalAlpha = 1;
    renderer.context.drawImage(this._tempCanvas, 0, 0);

    for (let i = 0; i < this.children.length; i++) {
        if (!this.children[i]._isWindow) {
            this.children[i].renderCanvas(renderer);
        }
    }
};
/**
 * @method _canvasClearWindowRect
 * @param {PIXI.CanvasRenderer} renderSession
 * @param {Window} window
 * @private
 */
WindowLayer.prototype._canvasClearWindowRect = function (renderSession, window) {
    const rx = this.x + window.x;
    const ry = this.y + window.y + window.height / 2 * (1 - window._openness / 255);
    const rw = window.width;
    const rh = window.height * window._openness / 255;
    renderSession.context.clearRect(rx, ry, rw, rh);
};

WindowLayer.prototype.render_PIXI = PIXI.Container.prototype.render;

/**
 * @method render
 * @param {PIXI.Renderer} renderSession
 * @private
 */
WindowLayer.prototype.render = function (renderer) {
    for (const child of this.children) {
        if (child.visible && child.renderable &&
            (!child._isWindow || child.openness > 0)) {
            child.render(renderer);
        }
    }
};

/**
 * @method _maskWindow
 * @param {Window} window
 * @private
 */
WindowLayer.prototype._maskWindow = function (window, shift) {
    this._windowMask._currentBounds = null;
    this._windowMask.boundsDirty = true;
    const rect = this._windowRect;
    rect.x = this.x + shift.x + window.x;
    rect.y = this.y + shift.y + window.y + window.height / 2 * (1 - window._openness / 255);
    rect.width = window.width;
    rect.height = window.height * window._openness / 255;
};

// The important members from Pixi.js

/**
 * The x coordinate of the window layer.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate of the window layer.
 *
 * @property y
 * @type Number
 */

/**
 * [read-only] The array of children of the window layer.
 *
 * @property children
 * @type Array
 */

/**
 * [read-only] The object that contains the window layer.
 *
 * @property parent
 * @type Object
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */
