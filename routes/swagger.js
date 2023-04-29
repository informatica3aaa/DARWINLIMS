import swaggerJSDoc from "swagger-jsdoc";
const swaggerUi = require('swagger-ui-express');

var myHeaders =  new Headers()
myHeaders.append('Content-Type','application/json; charset=utf-8');

const options = {
    definition :{
        openapi :"3.0.0",
        info:{ title:"DarwinLims API", version: "1.0"},
        components: {
            // securitySchemes: {
            //     bearerAuth: {
            //         type: 'http',
            //         scheme: 'bearer',
            //         Authorization: 'sssssssssssss',
            //         bearerFormat: 'JWT',
            //     },
            //     Authorization: `${process.env.TOKEN}`
            // },
                // headers : {
                //     headers: {'Authorization': `${process.env.TOKEN}`},
                // }
                securitySchemes: {
                    ApiKeyAuth: {
                        type: 'apikey',
                        in: 'headers',
                        name:  ' '
                    }
                }
        },

        security: [{
            ApiKeyAuth: []
        }]
    },
    apis:['routes/api/cotizacion/cotizacion.js','routes/api/herramientas/herramienta.js'],
    header : myHeaders

};
const swaggerSpec = swaggerJSDoc(options);
 
//funcion 
const swaggerDocs = (app, port) =>{
    app.use('/api2/docs', swaggerUi.serve , swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res)=>{
        res.setHeader(myHeaders);
        res.send(swaggerSpec)
    });
};
 module.exports = { swaggerDocs }
