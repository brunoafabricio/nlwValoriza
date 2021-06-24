import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    // Verificar se email existe
    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect")
    }

    // Verificar se senha está correta

    //12345 / 09170239481-askdoqigw1298341
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Email/Password incorrect ")
    }
    
    // Gerar token
    const token = await sign({
      email: user.email
    }, "4ec580b109680fefa539df6d8dc28826",  {
      subject: user.id,
      expiresIn: "1d" // token expira em 1 dia
      // em produção, aplicação faz um refresh token 
    })

    return token
  }
}

export { AuthenticateUserService }