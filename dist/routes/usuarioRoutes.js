"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarioController_1.usuarioController.list);
        this.router.post('/', usuarioController_1.usuarioController.add);
        this.router.put('/', usuarioController_1.usuarioController.update);
        this.router.delete('/', usuarioController_1.usuarioController.delete);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
//# sourceMappingURL=usuarioRoutes.js.map