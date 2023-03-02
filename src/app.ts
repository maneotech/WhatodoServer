// Databases
import { DatabasesService } from './services/databases.service'
DatabasesService.initDatabases();
// Logs
import { LogsService } from './services/logs.service'
import logTimestant from 'log-timestamp'
logTimestant(LogsService.formatLogs);
// Libs
import express from 'express';
import { AsyncExpressService } from './services/async-express.service';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
// Conf
import conf from '../confs/conf';
// Middlewares
import { clientIpMiddleware } from './middlewares/clientip.middleware';
import { firewallMiddleware } from './middlewares/firewall.middleware';
// Service
import RequestErrors from './services/request-errors.service';
// Constants
import { InternalPathConstants } from './constants/internal-path.constant';
// Routers
import { userRouter } from './routes/user/user.route';

console.log("\n\
 _______________________________________________________  \n\
|-------------------------------------------------------| \n\
|-------------------------------------------------------| \n\
|------------        SERVER STARTING...     ------------| \n\
|------------       MODE : " + conf.env + "      ------------| \n\
|-------------------------------------------------------| \n\
|-------------------------------------------------------| \n\
 ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞ ͞   \n\
");

// Initializations
const app = AsyncExpressService.getAsyncExpress();
const router = AsyncExpressService.getAsyncRouter();
const server = http.createServer(app);

declare global {
    namespace Express {
        interface Request {
            shared?: any; // share data between middlewares
        }
    }
}

// Middlewares
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(clientIpMiddleware);
app.use(firewallMiddleware)
//app.use(debugMiddleware);

// Main routes
app.use('/api', router);

// Routes 
router.use('/user', userRouter);

// Static
app.use('/static', express.static(InternalPathConstants.static, {fallthrough: true}), function (req, res) {
    return RequestErrors.fileNotFound(req, res);
});

// Errors
app.use('/', (req, res, next) => {
    RequestErrors.pathNotFound(req, res, null);
});

// Listien on port
server.listen(conf.port, () => {
    console.log('Server listening on port - HTTP : ' + conf.port);
});

export const App = app;