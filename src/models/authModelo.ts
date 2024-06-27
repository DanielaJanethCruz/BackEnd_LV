import pool from "../config/connections";



class AuthModelo {
    /*
    *Método para buscar un usuario por username
    */
    public async getuserByEmail(email: string) {
	       let query = "SELECT * FROM tbl_usuario WHERE email='" + email + "'"
        const result = await pool.then(async (connection) => {
            return await connection.query(query);
        });
        return result;
    }
}
const model = new AuthModelo();
export default model;
