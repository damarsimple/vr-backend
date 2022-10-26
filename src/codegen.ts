import SwaggerAutogen from "swagger-autogen";

const swaggerAutogen = SwaggerAutogen()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './src/api/index.ts'
]
swaggerAutogen(outputFile, endpointsFiles);
