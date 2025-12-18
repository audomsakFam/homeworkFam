"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const menu_routes_1 = __importDefault(require("./routes/menu.routes"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
exports.app.use("/api/menu", menu_routes_1.default);
exports.app.get("/", (req, res) => {
    res.send({ msg: "ok" });
});
//# sourceMappingURL=app.js.map