import fs from 'fs'
import { InternalPathConstants } from '../constants/internal-path.constant';

let accessForbiddenHtml = null;
let fileNotFoundHtml = null;
let pathNotFoundHtml = null;
let internalErrorHtml = null;
let accessExpiredHtml = null;

export default class RequestErrors {
    constructor() {
    }

    static accessForbidden(req, res) {
        if (accessForbiddenHtml) {
            res.writeHead(403, {"Content-Type": "text/html"});
            res.write(accessForbiddenHtml);
            return res.end();
        } else {
            return res.status(403).json("Access forbidden");
        }
    }

    static fileNotFound(req, res, err = null) {
        if (fileNotFoundHtml) {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write(fileNotFoundHtml);
            return res.end();
        } else {
            return res.status(404).json("File not found");
        }
    }

    static pathNotFound(req, res, err = null) {
        if (pathNotFoundHtml) {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write(pathNotFoundHtml);
            return res.end();
        } else {
            return res.status(404).json("Page not found");
        } 
    }

    static internalError(req, res, err = null) {
        console.error("Internal error : ");
        console.error(err);
        if (internalErrorHtml) {
            res.writeHead(500, {"Content-Type": "text/html"});
            res.write(internalErrorHtml);
            return res.end();
        } else {
            return res.status(500).json("Internal server error");
        }
    }

    static accessExpired(req, res, err = null) {
        if (accessExpiredHtml) {
            res.writeHead(460, {"Content-Type": "text/html"});
            res.write(accessExpiredHtml);
            return res.end();
        } else {
            return res.status(460).json("Access expired");
        }
    }

    static tokenInvalid(req, res, err = null) {
        if (accessExpiredHtml) {
            res.writeHead(461, {"Content-Type": "text/html"});
            res.write(accessExpiredHtml);
            return res.end();
        } else {
            return res.status(461).json("Invalid token");
        }
    }
}

function initHtmls() {
    fs.readFile(InternalPathConstants.assets + 'html/errors/403/index.html', function(err, data) {
        if (!err) {
            accessForbiddenHtml = data;
        }
    }); 
    fs.readFile(InternalPathConstants.assets + 'html/errors/404/index.html', function(err, data) {
        if (!err) {
            fileNotFoundHtml = data;
        }
    }); 
    fs.readFile(InternalPathConstants.assets + 'html/errors/404/index.html', function(err, data) {
        if (!err) {
            pathNotFoundHtml = data;
        }
    }); 
    fs.readFile(InternalPathConstants.assets + 'html/errors/500/index.html', function(err, data) {
        if (!err) {
            internalErrorHtml = data;
        }
    }); 
    fs.readFile(InternalPathConstants.assets + 'html/errors/460/index.html', function(err, data) {
        if (!err) {
            accessExpiredHtml = data;
        }
    });
}

initHtmls();
