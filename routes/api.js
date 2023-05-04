import { Router } from 'express';
import  Cotizacion from './api/cotizacion/cotizacion'
import Analisis from './api/analisis/analisis';
import Trabajo from './api/trabajos/trabajo';
import Herramientas from './api/herramientas/herramienta';
import Pagos from './api/pagos/pago';
import Xml from './api/xml/xml'
import requisition from './api/requisition/requisitions'
// import APIToken from './api/token';
import Cliente from './api/cliente/cliente';
import Bodega from './api/bodega/bodega';
import Log from './api/log/log';
import APIUsersRouter from './api/users'
import Email from './api/email/email'
import Notificaciones from './api/notificaciones/notificaciones';


class ApiRouter {

constructor(){

const api = Router();
    api.use('/requisition', new requisition());
    api.use('/analisis', new Analisis());
    api.use('/bodega', new Bodega());
    api.use('/cliente', new Cliente());
    api.use('/mensaje', new Email());
    api.use('/quotations', new Cotizacion());
    api.use('/v2/quotations', new Cotizacion());
    api.use('/herramientas', new Herramientas());
    api.use('/pagos', new Pagos());
    api.use('/trabajos', new Trabajo());
    api.use('/xml', new Xml());
    api.use('/log', new Log)
    api.use('/notificaciones', new Notificaciones)
    // api.use('/auth', passport.authenticate('local', { session: false }), new AuthRouter());
    //api.use('/auth', new AuthRouter());
    api.use('/user', APIUsersRouter.create());
    return api;
  }






}

export default ApiRouter;
