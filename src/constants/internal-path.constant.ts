import path from 'path'

const root = path.join(__dirname, '../../../');
const relativeAssetsPathFromRoot = 'assets/';

// Path of app directory
export const InternalPathConstants = {
    root : root,
    assets : path.join(root, relativeAssetsPathFromRoot),
    adVideos: path.join(root, relativeAssetsPathFromRoot, 'ad/videos/')
}