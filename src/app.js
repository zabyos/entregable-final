import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import http from "http";

import { connectDB } from "./config/db.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// sockets
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const startServer = async () => {
  try {
    await connectDB();

    server.listen(8080, () => {
      console.log("Servidor escuchando en puerto 8080");
    });
  } catch (error) {
    console.error("Error iniciando el servidor:", error);
  }
};

startServer();