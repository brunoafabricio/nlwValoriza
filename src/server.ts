import express from "express";

const app = express();

/**
 * GET    => Buscar uma informação
 * POST   => Inserir(CRIAR) uma informação
 * PUT    => Alterar um informação
 * DELETE => Deletar uma informação 
 * PATCH  => Alterar uma informação específica
 */

app.get("/test", (request, response)=> {
  // Request  => Entrando
  // Response => Saíndo 
  response.send("Olá NLW!")
})

app.post("/test-post", (request, response)=> {
  return response.send("Olá NLW método POST")
})

// http://localhost:3000
app.listen(3000, () => console.log("Server is running"));