"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalPathConstants = void 0;
const path_1 = __importDefault(require("path"));
const conf_1 = __importDefault(require("../../confs/conf"));
const root = path_1.default.join(__dirname, '../../../');
const relativeAssetsPathFromRoot = 'assets/';
const websiteRoot = conf_1.default.urlPort + 'static/';
// Path of app directory
exports.InternalPathConstants = {
    root: root,
    assets: path_1.default.join(root, relativeAssetsPathFromRoot),
    adVideos: path_1.default.join(websiteRoot, 'ad/videos/')
};
//# sourceMappingURL=internal-path.constant.js.map