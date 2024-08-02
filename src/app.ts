import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import usuarioRoutes from './routes/usuarioRoutes';

class Server {
  private app:Application;

  constructor(){
    this.app = express();
    this.config();
    this.routes();
    this.app.listen(this.app.get("port"), () => {
        console.log("Server on port", this.app.get("port"));
    });

  }

  config():void{
    this.app.set("port", 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors({
      origin: '*', // Permite todos los orígenes
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization'
    }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
  }
  routes(){
    this.app.use("/", authRoutes);
    this.app.use("/usuario",usuarioRoutes);
  }
}
const server = new Server();
