System.register([], function (exports_1, context_1) {
    "use strict";
    var FONT_SIZE_FACTOR;
    var __moduleName = context_1 && context_1.id;
    function getBGColor(color, alpha) {
        if (alpha === void 0) { alpha = 0.3; }
        return color;
    }
    exports_1("getBGColor", getBGColor);
    function getFontSize(text, elemWidth, elemHeight) {
        if (elemHeight === void 0) { elemHeight = +Infinity; }
        var MAX_TEXT_WIDTH = 100 / 100;
        var MAX_TEXT_HEIGHT = 40 / 100;
        var textLength = text.length || 1;
        var textCellWidth = elemWidth * MAX_TEXT_WIDTH / textLength;
        var textCellHeight = elemHeight * MAX_TEXT_HEIGHT;
        var textCellSize = Math.min(textCellWidth, textCellHeight) * FONT_SIZE_FACTOR;
        return Math.round(textCellSize);
    }
    exports_1("getFontSize", getFontSize);
    return {
        setters: [],
        execute: function () {
            FONT_SIZE_FACTOR = 1.0;
        }
    };
});
//# sourceMappingURL=utils.js.map