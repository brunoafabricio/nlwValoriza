import "reflect-metadata";
import express, { Request, Response, NextFunction} from "express";
import "express-async-errors"
import cors from "cors"

import { router } from "./routes";

import "./database";

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof Error){
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

// http://localhost:3000
app.listen(3000, () => console.log("Server is running"));

/**
 * app.get("/test", (request, response)=> {
  // Request  => Entrando
  // Response => Saíndo 
  response.send("Olá NLW!")
})

app.post("/test-post", (request, response)=> {
  return response.send("Olá NLW método POST")
})
 */


/**
 * GET    => Buscar uma informação
 * POST   => Inserir(CRIAR) uma informação
 * PUT    => Alterar um informação
 * DELETE => Deletar uma informação 
 * PATCH  => Alterar uma informação específica
 */

/**
 * Tipos de parâmetros
 * Routes Params  =>  http://localhost:3000/produtos/1978236
 * Query Params   =>  http://localhost:3000/produtos?name=teclado&description-tecladobom
 * Body Params    =>  {
 *  "name": "teclado",
 *  "description": "teclado bom"
 * }
 */