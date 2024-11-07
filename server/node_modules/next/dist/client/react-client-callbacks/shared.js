// This module can be shared between both pages router and app router
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "onRecoverableError", {
    enumerable: true,
    get: function() {
        return onRecoverableError;
    }
});
const _bailouttocsr = require("../../shared/lib/lazy-dynamic/bailout-to-csr");
const _reportglobalerror = require("./report-global-error");
const _stitchederror = require("../components/react-dev-overlay/internal/helpers/stitched-error");
const onRecoverableError = (err, errorInfo)=>{
    const stitchedError = (0, _stitchederror.getReactStitchedError)(err);
    // In development mode, pass along the component stack to the error
    if (process.env.NODE_ENV === 'development' && errorInfo.componentStack) {
        stitchedError._componentStack = errorInfo.componentStack;
    }
    // Skip certain custom errors which are not expected to be reported on client
    if ((0, _bailouttocsr.isBailoutToCSRError)(err)) return;
    (0, _reportglobalerror.reportGlobalError)(stitchedError);
};

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=shared.js.map