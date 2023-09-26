"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const DB_Connect_1 = __importDefault(require("./utils/DB.Connect"));
const Auth_Handler_1 = __importDefault(require("./handler/Auth.Handler"));
const Game_Handler_1 = __importDefault(require("./handler/Game.Handler"));
dotenv_1.default.config();
//  Connect to database.
(0, DB_Connect_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use('/api/auth', Auth_Handler_1.default);
app.use('/api/games', Game_Handler_1.default);
mongoose_1.default.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
