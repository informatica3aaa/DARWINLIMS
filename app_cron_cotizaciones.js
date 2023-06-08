import { schedule } from 'node-cron';
import Cotizaciones from './lib/models/cotizacion/cotizacionSQL';

class App {
    constructor() {
    }

    initialize() {
        const app = this;
        app.updateCotizacionesDesiertas();
        console.log("CRON Activado-> Cotizaciones Desiertas.");
    }


    async updateCotizacionesDesiertas() {
        schedule('0 0 * * * *', async function() {
            const rowsAfected = await Cotizaciones.updateCotizacionesDesiertas();
            console.log("Actualizando cotizaciones desiertas: ", rowsAfected);
            
        });
    }


}

export default App;