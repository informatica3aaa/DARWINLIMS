import { schedule } from 'node-cron';
import Cotizaciones from './lib/models/cotizacion/cotizacionSQL';
import * as CoreHerramienta from './routes/api/herramientas/core-herramienta'; 

class App {
    constructor() {
    }

    initialize() {
        const app = this;
        app.updateCotizacionesDesiertas();
        app.actualizacionCurrencies();
        console.log("CRON Activado-> Cotizaciones Desiertas.");
    }


    async updateCotizacionesDesiertas() {
        schedule(process.env.CRON_COTIZACIONES, async function() {
            const rowsAfected = await Cotizaciones.updateCotizacionesDesiertas();
            console.log("Actualizando cotizaciones desiertas: ", rowsAfected);
            
        });
    }

    async actualizacionCurrencies() {
        schedule(process.env.CRON_COTIZACIONES, async function() {
            const rowsAfected = await CoreHerramienta.getCurrencies();
           
        });
    }


}

export default App;