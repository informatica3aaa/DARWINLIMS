import { Router } from 'express';
import  Cotizacion from './api/cotizacion/route-cotizacion'
import Analisis from './api/analisis/analisis';
import Cliente from './api/cliente/route-cliente';
import Bodega from './api/bodega/route-bodega';
import Trabajo from './api/trabajos/route-trabajo';
import Herramientas from './api/herramientas/route-herramienta';
import Pagos from './api/pagos/route-pago';
import Xml from './api/xml/route-xml'
import AuthRouter from './api/auth';
import passport from './../lib/services/passport';

class ApiRouter {

  constructor(){
    const api = Router();
    
    api.use('/analisis', new Analisis());
    api.use('/bodega', new Bodega());
    api.use('/cliente', new Cliente());
    api.use('/cotizacion', new Cotizacion());
    api.use('/herramientas', new Herramientas());
    api.use('/pagos', new Pagos());
    api.use('/trabajos', new Trabajo());
    api.use('/xml', new Xml());
    api.use('/auth', passport.authenticate('local', { session: false }), new AuthRouter());
    return api;
  }






}

export default ApiRouter;
