import path from 'path'
var ip = require('ip');

const root = path.join(__dirname, '../../');
const relativeAssetsPathFromRoot = 'assets/';
const websiteRoot = "https://api.dev.whatodo.maneotech.fr/static/";
// Path of app directory
export const InternalPathConstants = {
    root : root,
    assets : path.join(root, relativeAssetsPathFromRoot),
    adVideos: path.join(websiteRoot, 'ad/videos/')
}