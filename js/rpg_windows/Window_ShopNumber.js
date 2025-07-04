//-----------------------------------------------------------------------------
// Window_ShopNumber
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.

function Window_ShopNumber() {
    this.initialize.apply(this, arguments);
}

Window_ShopNumber.prototype = Object.create(Window_Selectable.prototype);
Window_ShopNumber.prototype.constructor = Window_ShopNumber;

Window_ShopNumber.prototype.initialize = function (x, y, height) {
    const width = this.windowWidth();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this._max = 1;
    this._price = 0;
    this._number = 1;
    this._currencyUnit = TextManager.currencyUnit;
    this.createButtons();
};

Window_ShopNumber.prototype.windowWidth = function () {
    return 456;
};

Window_ShopNumber.prototype.number = function () {
    return this._number;
};

Window_ShopNumber.prototype.setup = function (item, max, price) {
    this._item = item;
    this._max = Math.floor(max);
    this._price = price;
    this._number = 1;
    this.placeButtons();
    this.updateButtonsVisibility();
    this.refresh();
};

Window_ShopNumber.prototype.setCurrencyUnit = function (currencyUnit) {
    this._currencyUnit = currencyUnit;
    this.refresh();
};

Window_ShopNumber.prototype.createButtons = function () {
    const bitmap = ImageManager.loadSystem('ButtonSet');
    const buttonWidth = 48;
    const buttonHeight = 48;
    this._buttons = [];
    for (let i = 0; i < 5; i++) {
        const button = new Sprite_Button();
        const x = buttonWidth * i;
        const w = buttonWidth * (i === 4 ? 2 : 1);
        button.bitmap = bitmap;
        button.setColdFrame(x, 0, w, buttonHeight);
        button.setHotFrame(x, buttonHeight, w, buttonHeight);
        button.visible = false;
        this._buttons.push(button);
        this.addChild(button);
    }
    this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
    this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
    this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
    this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
    this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
};

Window_ShopNumber.prototype.placeButtons = function () {
    const numButtons = this._buttons.length;
    const spacing = 16;
    let totalWidth = -spacing;
    for (let i = 0; i < numButtons; i++) {
        totalWidth += this._buttons[i].width + spacing;
    }
    let x = (this.width - totalWidth) / 2;
    for (let i = 0; i < numButtons; i++) {
        const button = this._buttons[i];
        button.x = x;
        button.y = this.buttonY();
        x += button.width + spacing;
    }
};

Window_ShopNumber.prototype.updateButtonsVisibility = function () {
    if (TouchInput.date > Input.date) {
        this.showButtons();
    } else {
        this.hideButtons();
    }
};

Window_ShopNumber.prototype.updateButtonsVisiblity = Window_ShopNumber.prototype.updateButtonsVisibility;

Window_ShopNumber.prototype.showButtons = function () {
    for (let i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = true;
    }
};

Window_ShopNumber.prototype.hideButtons = function () {
    for (let i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = false;
    }
};

Window_ShopNumber.prototype.refresh = function () {
    this.contents.clear();
    this.drawItemName(this._item, 0, this.itemY());
    this.drawMultiplicationSign();
    this.drawNumber();
    this.drawTotalPrice();
};

Window_ShopNumber.prototype.drawMultiplicationSign = function () {
    const sign = '\u00d7';
    const width = this.textWidth(sign);
    const x = this.cursorX() - width * 2;
    const y = this.itemY();
    this.resetTextColor();
    this.drawText(sign, x, y, width);
};

Window_ShopNumber.prototype.drawNumber = function () {
    const x = this.cursorX();
    const y = this.itemY();
    const width = this.cursorWidth() - this.textPadding();
    this.resetTextColor();
    this.drawText(this._number, x, y, width, 'right');
};

Window_ShopNumber.prototype.drawTotalPrice = function () {
    const total = this._price * this._number;
    const width = this.contentsWidth() - this.textPadding();
    this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY(), width);
};

Window_ShopNumber.prototype.itemY = function () {
    return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 1.5);
};

Window_ShopNumber.prototype.priceY = function () {
    return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2);
};

Window_ShopNumber.prototype.buttonY = function () {
    return Math.round(this.priceY() + this.lineHeight() * 2.5);
};

Window_ShopNumber.prototype.cursorWidth = function () {
    const digitWidth = this.textWidth('0');
    return this.maxDigits() * digitWidth + this.textPadding() * 2;
};

Window_ShopNumber.prototype.cursorX = function () {
    return this.contentsWidth() - this.cursorWidth() - this.textPadding();
};

Window_ShopNumber.prototype.maxDigits = function () {
    return 2;
};

Window_ShopNumber.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    this.processNumberChange();
};

Window_ShopNumber.prototype.isOkTriggered = function () {
    return Input.isTriggered('ok');
};

Window_ShopNumber.prototype.playOkSound = function () {};

Window_ShopNumber.prototype.processNumberChange = function () {
    if (this.isOpenAndActive()) {
        if (Input.isRepeated('right')) {
            this.changeNumber(1);
        }
        if (Input.isRepeated('left')) {
            this.changeNumber(-1);
        }
        if (Input.isRepeated('up')) {
            this.changeNumber(10);
        }
        if (Input.isRepeated('down')) {
            this.changeNumber(-10);
        }
    }
};

Window_ShopNumber.prototype.changeNumber = function (amount) {
    const lastNumber = this._number;
    this._number = (this._number + amount).clamp(1, this._max);
    if (this._number !== lastNumber) {
        SoundManager.playCursor();
        this.refresh();
    }
};

Window_ShopNumber.prototype.updateCursor = function () {
    this.setCursorRect(this.cursorX(), this.itemY(),
        this.cursorWidth(), this.lineHeight());
};

Window_ShopNumber.prototype.onButtonUp = function () {
    this.changeNumber(1);
};

Window_ShopNumber.prototype.onButtonUp2 = function () {
    this.changeNumber(10);
};

Window_ShopNumber.prototype.onButtonDown = function () {
    this.changeNumber(-1);
};

Window_ShopNumber.prototype.onButtonDown2 = function () {
    this.changeNumber(-10);
};

Window_ShopNumber.prototype.onButtonOk = function () {
    this.processOk();
};
