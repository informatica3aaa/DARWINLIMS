const moment = require('moment')
const nodemailer = require('nodemailer')
import { EnvioCotizacion , PagoPrevio,RechazoOferta } from '../themplates/correos/EnvioCotizacion'
import { AccionCotizacion } from '../themplates/correos/AccionCotizacion' 
import { EnvioRequisicion } from '../themplates/correos/EnvioRequisicion'
import * as CoreNotificaciones from '../../routes/api/notificaciones/core-notificaciones';
import * as CoreCotizacion from '../../routes/api/cotizacion/core-cotizacion';


const EMAIL_NO_REPLY = 'lims.3aaa@gmail.com'

class EmailHelper {

    constructor() 
    {
        if(!process.env.CORREO_USER) throw { message: 'Falta el variable de entorno CORREO_USER '}
        if(!process.env.CORREO_PASS) throw { message: 'Falta el variable de entorno CORREO_PASS '}
        if(!process.env.CORREO_HOST) throw { message: 'Falta el variable de entorno CORREO_HOST '}
        if(!process.env.CORREO_PORT) throw { message: 'Falta el variable de entorno CORREO_PORT '}

        this.transporter = nodemailer.createTransport({
           // host: process.env.CORREO_HOST,
           // port: process.env.CORREO_PORT,

            service: 'gmail',
            auth: {
                user: process.env.CORREO_USER, // generated ethereal user
                pass: process.env.CORREO_PASS // generated ethereal password
                // pass: 'whgdpawhauhnjdzg' // generated ethereal password
            }
    
        });
    } 

    async  sendQuotation(value, token, notif){
        // console.log('lo que llega al correo', value)
        const trasporter = this.transporter 
        return new Promise(async function (resolve, reject)
        { 
            if(!value.destinatario[0].mail) return  reject( { message: 'Falta definir : correo'})   

            const mail_subject = 'Confirmación de Cotización Andes Analytical Assay'
            const mail_to = `${ value.destinatario[0].mail}`
            const mail_from = `noreply@3aaa.cl`
            // const mail_bcc = value.mail_bcc_array || []
            const content = await EnvioCotizacion(value, token)

           trasporter.sendMail({ 
                from: mail_from, 
                to: mail_to, 
                // bcc: mail_bcc, 
                subject: mail_subject, 
                html: content
            }, 
            function (mail_error, info) 
            { 
                const send_time = moment().format('YYYY-MM-DD HH:mm:ss')
                if (mail_error) 
                { 
                    const msg_1 = `No se puede enviar correo a usuario, ${mail_error} `
                    const log_1 = CoreNotificaciones.actulizarEstado(notif.id, 'FALLIDO', msg_1)
                    const quo_1 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'ENVIO FALLIDO')
                    console.error(msg, mail_error)
                    return reject(msg, mail_error) 
                } 
                const msg_2 = `${mail_subject}:  ${JSON.stringify(info)} `
                const log_2 = CoreNotificaciones.actulizarEstado(notif.id, 'ENVIADO', msg_2)
                const quo_2 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'ENVIADA')
                // console.log("log_2",log_2);
                console.info(msg_2);
                return resolve(msg_2)
            })  
        })
    } 
    
    async sendQuotationPago(value, token, notif){
        const trasporter = this.transporter 
        return new Promise(async function (resolve, reject)
        { 
            if(!value.destinatario[0].mail) return  reject( { message: 'Falta definir : correo'})   

            const mail_subject = 'Pago previo de Cotización Andes Analytical Assay'
            const mail_to = `${ value.destinatario[0].mail}`
            const mail_from = `noreply@3aaa.cl`
            // const mail_bcc = value.mail_bcc_array || []
            const content = await PagoPrevio(value, token)

           trasporter.sendMail({ 
                from: mail_from, 
                to: mail_to, 
                // bcc: mail_bcc, 
                subject: mail_subject, 
                html: content
            }, 
            function (mail_error, info) 
            { 
                const send_time = moment().format('YYYY-MM-DD HH:mm:ss')
                if (mail_error) 
                { 
                    const msg_1 = `No se puede enviar correo a usuario, ${mail_error} `
                    const log_1 = CoreNotificaciones.actulizarEstado(notif.id, 'PAGO FALLIDO', msg_1)
                    const quo_1 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'PAGO PREVIO FALLIDO')
                    console.error(msg, mail_error)
                    return reject(msg, mail_error) 
                } 
                const msg_2 = `${mail_subject}:  ${JSON.stringify(info)} `
                const log_2 = CoreNotificaciones.actulizarEstado(notif.id, 'PAGO ENVIADO', msg_2)
                const quo_2 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'PAGO PREVIO ENVIADO')
                // console.log("log_2",log_2);
                console.info(msg_2);
                return resolve(msg_2)
            })  
        })
    }

    async sendQuotationRechazo(value, notif){
        const trasporter = this.transporter 
        return new Promise(async function (resolve, reject)
        { 
            if(!value.destinatario[0].mail) return  reject( { message: 'Falta definir : correo'})   

            const mail_subject = 'Notificación de Rechazo de Oferta - Andes Analytical Assay'
            const mail_to = `${ value.destinatario[0].mail}`
            const mail_from = `noreply@3aaa.cl`
            // const mail_bcc = value.mail_bcc_array || []
            const content = await RechazoOferta(value)

           trasporter.sendMail({ 
                from: mail_from, 
                to: mail_to, 
                // bcc: mail_bcc, 
                subject: mail_subject, 
                html: content
            }, 
            function (mail_error, info) 
            { 
                const send_time = moment().format('YYYY-MM-DD HH:mm:ss')
                if (mail_error) 
                { 
                    const msg_1 = `No se puede enviar correo a usuario, ${mail_error} `
                    const log_1 = CoreNotificaciones.actulizarEstado(notif.id, 'CONFIRMACION DE RECHAZO FALLIDO', msg_1)
                    const quo_1 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'CONFIRMACION DE RECHAZO FALLIDO')
                    console.error(msg, mail_error)
                    return reject(msg, mail_error) 
                } 
                const msg_2 = `${mail_subject}:  ${JSON.stringify(info)} `
                const log_2 = CoreNotificaciones.actulizarEstado(notif.id, 'CONFIRMACION DE RECHAZO ENVIADO', msg_2)
                const quo_2 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'CONFIRMACION DE RECHAZO ENVIADO')
                // console.log("log_2",log_2);
                console.info(msg_2);
                return resolve(msg_2)
            })  
        })
    }

    async sendRequisition(value, token, notif){
        const trasporter = this.transporter 
        return new Promise(async function (resolve, reject)
        { 
            if(!value.destinatario[0].mail) return  reject( { message: 'Falta definir : correo'})   

            const mail_subject = 'Ingreso de requisición Andes Analytical Assay'
            const mail_to = `${ value.destinatario[0].mail}`
            const mail_from = `noreply@3aaa.cl`
            // const mail_bcc = value.mail_bcc_array || []
            const content = await EnvioRequisicion(value, token)

           trasporter.sendMail({ 
                from: mail_from, 
                to: mail_to, 
                // bcc: mail_bcc, 
                subject: mail_subject, 
                html: content
            }, 
            function (mail_error, info) 
            { 
                const send_time = moment().format('YYYY-MM-DD HH:mm:ss')
                if (mail_error) 
                { 
                    const msg_1 = `No se puede enviar correo a usuario, ${mail_error} `
                    const log_1 = CoreNotificaciones.actulizarEstado(notif.id, 'REQUISICION FALLIDO', msg_1)
                    const quo_1 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'REQUISICION FALLIDO')
                    console.error(msg, mail_error)
                    return reject(msg, mail_error) 
                } 
                const msg_2 = `Notificacion de cotizacion:  ${JSON.stringify(info)} `
                const log_2 = CoreNotificaciones.actulizarEstado(notif.id, 'REQUISICION ENVIADO', msg_2)
                const quo_2 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'REQUISICION ENVIADO')
                // console.log("log_2",log_2);
                console.info(msg_2);
                return resolve(msg_2)
            })  
        })
    }

    async  sendQuotationAccion(value, token, notif){
        // console.log('lo que llega al correo', value)
        const trasporter = this.transporter 
        return new Promise(async function (resolve, reject)
        { 
            if(!process.env.CORREOS_VENTA_PRODUCCION) return  reject( { message: 'Falta definir : correo'})   
            const mail_subject = 'Se ha creado una nueva cotización'
            const mail_to =['2dcarrascocid@gmail.com','3ldago@gmail.com']
            const mail_from = `noreply@3aaa.cl`
            // const mail_bcc = value.mail_bcc_array || []
            const content = await AccionCotizacion(value, token)

           trasporter.sendMail({ 
                from: mail_from, 
                to: mail_to, 
                // bcc: mail_bcc, 
                subject: mail_subject, 
                html: content
            }, 
            function (mail_error, info) 
            { 
                console.log("MAIL ERRRO",mail_error );
                const send_time = moment().format('YYYY-MM-DD HH:mm:ss')
                if (mail_error) 
                { 
                    const msg_1 = `No se puede enviar correo a usuario, ${mail_error} `
                    const log_1 = CoreNotificaciones.actulizarEstado(notif.id, 'FALLIDO', msg_1)
                    const quo_1 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'ENVIO FALLIDO')
                    console.error(msg, mail_error)
                    return reject(msg, mail_error) 
                } 
                const msg_2 = `${mail_subject}:  ${JSON.stringify(info)} `
                const log_2 = CoreNotificaciones.actulizarEstado(notif.id, 'ENVIADO', msg_2)
                const quo_2 = CoreCotizacion.cambiarEstadoNotificacion(value.id, 'EN APROBACION')
                // console.log("log_2",log_2);
                console.info(msg_2);
                return resolve(msg_2)
            })  
        })
    } 
}

export default EmailHelper