"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Patient_1 = require("./entities/Patient");
const Scan_1 = require("./entities/Scan");
const User_1 = require("./entities/User");
const patient_1 = require("./resolvers/patient");
const scan_1 = require("./resolvers/scan");
const user_1 = require("./resolvers/user");
const main = async () => {
    await (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "retinaoct",
        username: "postgres",
        password: "postgres",
        logging: true,
        synchronize: true,
        entities: [User_1.User, Patient_1.Patient, Scan_1.Scan],
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver, patient_1.PatientResolver, scan_1.ScanResolver],
            validate: false,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log("Server started on localhost:4000");
    });
};
main().catch((e) => {
    console.error(e);
});
//# sourceMappingURL=index.js.map