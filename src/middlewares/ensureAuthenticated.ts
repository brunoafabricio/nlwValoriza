import { Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  
  // Receber o token
  const authToken = request.headers.authorization
  
  // Validar se token está preenchido
  if(!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ")
  
  // Validar se token é válido
  try {
    const { sub } = verify(token , "4ec580b109680fefa539df6d8dc28826") as IPayload;

    request.user_id = sub;

    return next();
    // console.log(decode);
  } catch (err) {
    return response.status(401).end()
  }
  
  
  
  //Recuperar informações do usuário
  
  
}