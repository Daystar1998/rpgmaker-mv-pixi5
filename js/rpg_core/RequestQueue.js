//-----------------------------------------------------------------------------
function RequestQueue() {
    this.initialize.apply(this, arguments);
}

RequestQueue.prototype.initialize = function () {
    this._queue = [];
};

RequestQueue.prototype.enqueue = function (key, value) {
    this._queue.push({
        key: key,
        value: value,
    });
};

RequestQueue.prototype.update = function () {
    if (this._queue.length === 0) return;

    const top = this._queue[0];
    if (top.value.isRequestReady()) {
        this._queue.shift();
        if (this._queue.length !== 0) {
            this._queue[0].value.startRequest();
        }
    } else {
        top.value.startRequest();
    }
};

RequestQueue.prototype.raisePriority = function (key) {
    for (let n = 0; n < this._queue.length; n++) {
        const item = this._queue[n];
        if (item.key === key) {
            this._queue.splice(n, 1);
            this._queue.unshift(item);
            break;
        }
    }
};

RequestQueue.prototype.clear = function () {
    this._queue.splice(0);
};
