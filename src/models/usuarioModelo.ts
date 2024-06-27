
import pool from '../config/connections';
import { utils } from '../utils/utils';

class UsuarioModelo {

    public async list() {
        const result = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT u.email, u.password, u.role FROM tbl_usuario u"
            );
        });
        return result;
    }

    public async add(usuario: any) {
        // Verificar si el email ya existe
        const emailExists = await pool.then(async (connection) => {
            const result = await connection.query(
                "SELECT COUNT(*) as count FROM tbl_usuario WHERE email = ?", [usuario.email]
            );
            return result[0].count > 0;
        });
        if (emailExists) {
            throw new Error('El email ya está en uso.');
        }
        // Encriptar la contraseña
        var encryptedText = await utils.hashPassword(usuario.password);
        console.log('Encrypted Password:', encryptedText); // Depuración
        usuario.password = encryptedText;

        const result = await pool.then(async (connection) => {
            return await connection.query(
                "INSERT INTO tbl_usuario SET ?", [usuario]
            );
        });
        return result;
    }

    public async update(usuario: any) {
        // Verificar si el usuario existe
        const userExists = await pool.then(async (connection) => {
            const result = await connection.query(
                "SELECT COUNT(*) as count FROM tbl_usuario WHERE email = ?", [usuario.email]
            );
            return result[0].count > 0;
        });
        if (!userExists) {
            throw new Error('El usuario no existe.');
        }
        // Encriptar la contraseña
        var encryptedText = await utils.hashPassword(usuario.password);
        console.log('Encrypted Password:', encryptedText); // Depuración
        usuario.password = encryptedText;

        const update = "UPDATE tbl_usuario SET password = ? WHERE email = ?";
        const result = await pool.then(async (connection) => {
            return await connection.query(update, [usuario.password, usuario.email]);
        });
        return result;
    }

    public async delete(email: string) {
        // Verificar si el usuario existe
        const userExists = await pool.then(async (connection) => {
            const result = await connection.query(
                "SELECT COUNT(*) as count FROM tbl_usuario WHERE email = ?", [email]
            );
            return result[0].count > 0;
        });

        if (!userExists) {
            throw new Error('El usuario no existe.');
        }

        const result = await pool.then(async (connection) => {
            return await connection.query(
                "DELETE FROM tbl_usuario WHERE email = ?", [email]
            );
        });
        return result;
    }
}

const model = new UsuarioModelo();
export default model;