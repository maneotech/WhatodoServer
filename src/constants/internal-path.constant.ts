import path from 'path'
import conf from '../../confs/conf';

const root = path.join(__dirname, '../');
const relativeAssetsPathFromRoot = '../../assets/';
const relativeConfsPathFromRoot = '../../confs/';
const relativeParentServerDirectoryPathFromRoot = '../../../';

// Path of app directory
export const InternalPathConstants = {
    root : root,
    static : path.join(root, '../../', conf.staticRelativePath + '/'),
    assets : path.join(root, relativeAssetsPathFromRoot),
    parent : path.join(root, relativeParentServerDirectoryPathFromRoot),
    confs : path.join(root, relativeConfsPathFromRoot),
}