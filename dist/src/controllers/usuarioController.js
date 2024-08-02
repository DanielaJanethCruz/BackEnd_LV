"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const validator_1 = __importDefault(require("validator"));
const usuarioModelo_1 = __importDefault(require("../models/usuarioModelo"));
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield usuarioModelo_1.default.list();
                return res.json({ message: "Listado de Usuario", code: 0, data: usuarios });
            }
            catch (error) {
                return res.status(500).json({ message: ` ${error.message}` });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role } = req.body;
                // Verificar que los datos no estén vacíos
                if (validator_1.default.isEmpty(email.trim()) || validator_1.default.isEmpty(password.trim()) || validator_1.default.isEmpty(role.trim())) {
                    return res.status(400).json({ message: "Todos los campos son requeridos", code: 1 });
                }
                // Agregar el usuario
                yield usuarioModelo_1.default.add({ email, password, role });
                return res.json({ message: "Usuario agregado exitosamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message} ` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Verificar que los datos no estén vacíos
                if (validator_1.default.isEmpty(email.trim()) || validator_1.default.isEmpty(password.trim())) {
                    return res.status(400).json({ message: "Todos los campos son requeridos", code: 1 });
                }
                // Actualizar el usuario
                yield usuarioModelo_1.default.update({ email, password });
                return res.json({ message: "Usuario actualizado exitosamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: ` ${error.message}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                // Verificar que el email no esté vacío
                if (validator_1.default.isEmpty(email.trim())) {
                    return res.status(400).json({ message: "El email es requerido", code: 1 });
                }
                // Eliminar el usuario
                yield usuarioModelo_1.default.delete(email);
                return res.json({ message: "Usuario eliminado exitosamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: ` ${error.message}` });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
//# sourceMappingURL=usuarioController.js.map