import axios from 'axios';
import Herramienta from '../../../lib/models/herramienta/herramienta';

export const getRegiones = async ()=>{

    console.log("llego aca::");
    const regiones = Herramienta.getRegiones();
    console.log("llego aca 2::");

    return regiones;
}