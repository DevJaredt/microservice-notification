import express from "express";
import mongoose from "mongoose";
import router from "./routes/notificationRoutes";



const app = express();
app.use(express.json());
app.use(router);

const startServer = async () => {
    try {
        await mongoose.connect("mongodb://jared:jared123@localhost:27017/notifications?authsource=admin");
        console.log("Conectado a MongoDB");

        app.listen(3000, () => {
            console.log("Servidor corriendo en http://localhost:3000");
        });
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};

startServer();
