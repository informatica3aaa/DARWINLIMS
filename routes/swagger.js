import swaggerJSDoc from "swagger-jsdoc";
const swaggerUi = require('swagger-ui-express');


const options = {
    definition :{
        openapi :"3.0.0",
        info:{ title:"Minerals-Darwin API", version: "1.0"},

    },
    apis:['routes/api/cotizacion/cotizacion.js','routes/api/herramientas/herramienta.js']
};
const swaggerSpec = swaggerJSDoc(options);
//funcion 
const swaggerDocs = (app, port) =>{
    
    app.use('/api/docs', swaggerUi.serve , swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    });


};
 module.exports = { swaggerDocs }
