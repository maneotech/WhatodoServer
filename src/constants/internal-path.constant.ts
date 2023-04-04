import path from 'path'
import conf from '../../confs/conf';

const root = path.join(__dirname, '../../../');
const relativeAssetsPathFromRoot = 'assets/';
const websiteRoot = conf.urlPort + 'static/';
// Path of app directory
export const InternalPathConstants = {
    root : root,
    assets : path.join(root, relativeAssetsPathFromRoot),
    adVideos: path.join(websiteRoot, 'ad/videos/')
}