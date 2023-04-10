//require('dotenv').config();

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
// Middlewares
import { clientIpMiddleware } from './middlewares/clientip.middleware';
import { firewallMiddleware } from './middlewares/firewall.middleware';
// Service
import RequestErrors from './services/request-errors.service';
// Constants
import { InternalPathConstants } from './constants/internal-path.constant';
// Routers
import { userRouter } from './routes/user/user.route';
import { placeRouter } from './routes/place/place.route';
import { adVideoRouter } from './routes/ad/ad.video.route';
import { adRouter } from './routes/ad/ad.route';
import { homeRouter } from './routes/home/home.route';

console.log("\n\
 _______________________________________________________  \n\
|-------------------------------------------------------| \n\
|-------------------------------------------------------| \n\
|------------        SERVER STARTING...     ------------| \n\
|------------       MODE : " + process.env.MODE + "      ------------| \n\
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
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(clientIpMiddleware);
app.use(firewallMiddleware)
//app.use(debugMiddleware);

// Main routes
app.use('/api', router);

// Routes 
router.use('/user', userRouter);
router.use('/place', placeRouter);
router.use('/ad', adRouter);
router.use('/home', homeRouter);


// Static
app.use('/static/', express.static(InternalPathConstants.assets), function (req, res) {
    return RequestErrors.fileNotFound(req, res);
});

// Errors
app.use('/', (req, res, next) => {
    RequestErrors.pathNotFound(req, res, null);
});

// Listien on port
server.listen(parseInt(process.env.PORT), "0.0.0.0", () => {
    console.log('Server listening on port - HTTP : ' + process.env.PORT);
});

export const App = app;