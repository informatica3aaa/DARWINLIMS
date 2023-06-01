import App from '../app_cron_cotizaciones';
import debug from 'debug';
import dotenv from 'dotenv';

dotenv.config();
debug('minerals:cron_cotizaciones');

const app = new App();
app.initialize();
