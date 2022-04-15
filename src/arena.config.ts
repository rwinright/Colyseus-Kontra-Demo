import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import express from "express";
import path from 'path';
import cors from 'cors'

/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom);

    },

    initializeExpress: (app) => {
        app.use(cors())
        app.use("/colyseus", monitor());

        app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname, '../client/dist/'));
        });

        app.use('/', express.static(path.join(__dirname, '../client/dist')));

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});