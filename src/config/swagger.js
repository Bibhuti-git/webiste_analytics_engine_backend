const { verify } = require('jsonwebtoken');
const { version } = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const path = require('path');

// const something = require('../../src/routes/authroutes')

const swaggerOptions ={
    definition:{
        openapi:'3.0.0',
        info:{
            title:" Website Analytics API",
            version:"1.0.0",
            description:"Website Analytics API Information",
        },
        servers:[{url:"http://localhost:5000"}],
    },
    apis:[path.join(__dirname,'../../src/routes/**.js')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);



const setUpSwagger = (app) => {
    app.use("/api-docs/",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
};

module.exports = setUpSwagger;