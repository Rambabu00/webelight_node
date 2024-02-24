import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
 
const options = {
  definition: {
    openapi: '3.0.0', // specify the OpenAPI version
    info: {
      title: 'webelight nodejs Assignment',
      version: '1.0.0',
      description: 'This is a simple FMCG commercial backend APIs',
     
    },servers: [
      {
        url: 'http://localhost:3000',
    
      },
    ],
     
    components: {
      securitySchemes: {
        BearerAuthCustomer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
         BearerAuthAdmin: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    path.resolve(__dirname, 'routes/*.ts')
  ],
};

const specs = swaggerJsdoc(options);

export default specs;