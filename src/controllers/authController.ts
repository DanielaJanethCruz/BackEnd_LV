import { Request, Response } from "express";
import validator from "validator";
import model from "../models/authModelo";
import jwt from 'jsonwebtoken';
import db from '../utils/database';
import { utils } from "../utils/utils";

// Asegúrate de importar el módulo de utilidades donde se encuentra `checkPassword`

class AuthController {
    public async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            // Recortar espacios en blanco y verificar que los datos no estén vacíos
            if (!email || validator.isEmpty(email.trim()) || !password || validator.isEmpty(password.trim())) {
                return res
                    .status(400)
                    .json({ message: "Los campos son requeridos", code: 1 });
            }
            
            // Buscar el usuario por correo electrónico
            const lstUsers = await model.getuserByEmail(email.trim());
    
            // Verificar si no se encontró ningún usuario
            if (lstUsers.length <= 0) {
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }

            console.log(lstUsers[0].username, lstUsers[0].password);
    
            // Verificar la contraseña utilizando `utils.checkPassword`
            let result = utils.checkPassword(password, lstUsers[0].password);
            result.then((value) => {
                if (value) {
                    const newUser ={
                        email: lstUsers[0].email,
                        password: lstUsers[0].password,
                        role:lstUsers[0].role
                    }
                    console.log(process.env.SECRET)
                    const env = require('dotenv').config();
                    let token = jwt .sign(newUser, process.env.SECRET,{expiresIn:'1h'})
                    return res.json({message: "Autenticacion correcta", token, code:0});
                } else {
                    return res.status(401).json({ message: "Password Incorrecto", code: 1 });
                }
            }).catch((error: any) => {
                return res.status(500).json({ message: `${error.message}` });
            });

        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }   
}
export const authController = new AuthController();