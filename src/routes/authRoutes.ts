import {Router, RouterOptions} from "express";
import { authController } from "../controllers/authController";

class AuthRoutes{
    public router: Router;

    constructor(){
        this.router= Router();
        this.config();
    }

    config(){
        //this.router.get('/', (req,res)=>{
          //  res.send('Invocando Autenticación')
        //});
        this.router.post('/', authController.iniciarSesion);
    }
}
const authRoutes= new AuthRoutes();
export default authRoutes.router; 