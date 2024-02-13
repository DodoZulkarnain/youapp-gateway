/*import { JwtModuleOptions } from "@nestjs/jwt";

const SecretJWT = process.env.SecretJWT;
const ExpiredJWT= process.env.ExpiredJWT;

export const jwtConfig: JwtModuleOptions = {
    secret: SecretJWT,
    signOptions: {
        expiresIn: ExpiredJWT
    },
}*/

const SecretJWT = process.env.SecretJWT;
const ExpiredJWT= process.env.ExpiredJWT;

export default () => ({
    secret: SecretJWT,
    signOptions: {
        expiresIn: ExpiredJWT
    },
  });