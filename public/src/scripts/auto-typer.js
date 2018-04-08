var VALID_OPTIONS = Object.freeze(['targetSelector', 'deleteInterval', 'addInterval', 'deleteDelay', 'addDelay']);

function AutoTyper (options) {
    // start at the first string in the array
    this.currentIndex = 0;
    // process options object if passed and set any valid options
    if (options && typeof options === 'object' && !Array.isArray(options)) {
        VALID_OPTIONS.forEach(function (validOptionKey) {
            if (options[validOptionKey]) {
                this.validOptionKey = options[validOptionKey];
            }
        });
    }

    return this;
}

AutoTyper.prototype = {
    targetSelector: '#typing-widget-target',
    deleteInterval: 50,
    addInterval: 50,
    deleteDelay: 5000,
    addDelay: 1000,
    logError: function (string) {
        console.error('[AutoTyper] ' + string);
    },
    init: function () {
        // find the target element and attach the strings passed in dataset to the instance
        this.targetElement = document.querySelector(this.targetSelector);
        this.stringsToType = this.targetElement.dataset.autoTyperText.split(',');

        if (!this.stringsToType || !Array.isArray(this.stringsToType) || !this.stringsToType.length) {
            this.logError('Target element must have a "data-typing-widget-text" attribute containing an array of strings')
            return;
        }

        this.addWidgetText();
    },
    addWidgetText: function () {
      var newString = this.stringsToType[this.currentIndex],
        i = 0,
        that = this;
        intervalId = setInterval(function () {
            if (i < newString.length) {
              that.targetElement.textContent = that.targetElement.textContent + newString[i];
              i += 1;
            } else {
              clearInterval(intervalId);
              that.currentIndex = ++that.currentIndex >= that.stringsToType.length ? 0 : that.currentIndex;
              setTimeout(that.removeWidgetText.bind(that), that.deleteDelay);
            }
        }, that.addInterval);
    },
    removeWidgetText: function () {
        var that = this,
            intervalId = setInterval(function () {
          if (that.targetElement.textContent.length) {
            that.targetElement.textContent = that.targetElement.textContent.slice(0, -1);
          } else {
            clearInterval(intervalId);
            setTimeout(that.addWidgetText.bind(that), that.addDelay);
          }
      }, that.deleteInterval)
    }
}
