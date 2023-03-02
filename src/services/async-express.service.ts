import express, { Router, Express } from 'express';
import asyncify from 'express-asyncify'

export class AsyncExpressService {

    static getAsyncExpress() : Express {
        return AsyncExpressService.asyncify(express())
    }

    static getAsyncRouter() : Router {
        return AsyncExpressService.asyncify(express.Router())
    }

    static asyncify(router : any) {
        return asyncify(router);
    }
}