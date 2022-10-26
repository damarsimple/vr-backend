import express from "express";
import cors from "cors";
import api from "./api";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import SwaggerAutogen from "swagger-autogen";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";
import { User } from "@prisma/client";


declare global {
    namespace Express {
        interface Request {
            auth: User;
            query: {
                [key: string]: any;

                orderBy?: number,
                take?: number,
                skip?: number,

            }
        }
    }
}

const app = express();

app.use(
    express.json(),
)
app.use(cors());
// app.use("/api", jwt({ secret: "mobile-secret", algorithms: ["HS256"] }))
// app.use("/api-admin", jwt({ secret: "admin-secret", algorithms: ["HS256"] }))

app.use("/api", api);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))