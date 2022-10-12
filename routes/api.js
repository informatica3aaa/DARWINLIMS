import { Router } from 'express';
import  Cotizacion from './api/cotizacion/cotizacion'
import Analisis from './api/analisis/analisis';
import Cliente from './api/cliente/cliente';
import Bodega from './api/bodega/bodega';
import Trabajo from './api/trabajos/trabajo';
import Herramientas from './api/herramientas/herramienta';
import Pagos from './api/pagos/pago';
import Xml from './api/xml/xml'
import APIToken from './api/token';

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
    api.use('/auth', APIToken.create());

    return api;
  }






}

export default ApiRouter;
