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
const connections_1 = __importDefault(require("../config/connections"));
const utils_1 = require("../utils/utils");
class UsuarioModelo {
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield connections_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("SELECT u.email, u.password, u.role FROM tbl_usuario u");
            }));
            return result;
        });
    }
    add(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si el email ya existe
            const emailExists = yield connections_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                const result = yield connection.query("SELECT COUNT(*) as count FROM tbl_usuario WHERE email = ?", [usuario.email]);
                return result[0].count > 0;
            }));
            if (emailExists) {
                throw new Error('El email ya está en uso.');
            }
            // Encriptar la contraseña
            var encryptedText = yield utils_1.utils.hashPassword(usuario.password);
            console.log('Encrypted Password:', encryptedText); // Depuración
            usuario.password = encryptedText;
            const result = yield connections_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("INSERT INTO tbl_usuario SET ?", [usuario]);
            }));
            return result;
        });
    }
    update(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si el usuario existe
            const userExists = yield connections_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                const result = yield connection.query("SELECT COUNT(*) as count FROM tbl_usuario WHERE email = ?", [usuario.email]);
                return result[0].count > 0;
            }));
            if (!userExists) {
                throw new Error('El usuario no existe.');
            }
            // Encriptar la contraseña
            var encryptedText = yield utils_1.utils.hashPassword(usuario.password);
            console.log('Encrypted Password:', encryptedText); // Depuración
            usuario.password = encryptedText;
            const update = "UPDATE tbl_usuario SET password = ? WHERE email = ?";
            const result = yield connections_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(update, [usuario.password, usuario.email]);
            }));
            return result;
        });
    }
    delete(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si el usuario existe
            const userExists = yield connections_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                const result = yield connection.query("SELECT COUNT(*) as count FROM tbl_usuario WHERE email = ?", [email]);
                return result[0].count > 0;
            }));
            if (!userExists) {
                throw new Error('El usuario no existe.');
            }
            const result = yield connections_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("DELETE FROM tbl_usuario WHERE email = ?", [email]);
            }));
            return result;
        });
    }
}
const model = new UsuarioModelo();
exports.default = model;
//# sourceMappingURL=usuarioModelo.js.map