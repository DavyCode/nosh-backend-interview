import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION_MINUTES } from "../../../config/env";
import { Jwt } from "../../../common/types/jwt";
import { UserDto } from "../../users/dto/user.dto";

// @ts-expect-error
const jwtSecret: string = JWT_SECRET;
const tokenExpirationInSeconds = JWT_EXPIRATION_MINUTES;

class JwtMiddleware {
	validJWTNeeded(req: Request, res: Response, next: NextFunction) {
		if (req.headers["authorization"]) {
			try {
				const authorization = req.headers["authorization"].split(" ");
				if (authorization[0] !== "Bearer") {
					return res
						.status(401)
						.send({ status: "error", error: "Unauthorized" });
				} else {
					res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
					next();
				}
			} catch (err: any) {
				return res.status(403).send({
					status: "error",
					error: "Unauthorized! something went wrong",
					message: err,
				});
			}
		} else {
			return res.status(401).send({
				status: "error",
				error: "Unauthorized! Authorization Header missing",
			});
		}
	}

	genToken(user: UserDto) {
		const token = jwt.sign(
			{
				role: user.role,
				userId: user._id,
				iat: Date.now(),
			},
			jwtSecret,
			{ expiresIn: tokenExpirationInSeconds }
		);

		return token;
	}

	/**
	 * verifyToken
	 * @param token
	 * @returns
	 */
	async verifyAuthToken(accessToken: string) {
		const token = accessToken.split(" ")[1];
		if (token) {
			try {
				const decode = jwt.verify(token, jwtSecret);

				return decode;
			} catch (err) {
				return undefined;
			}
		} else {
			return undefined;
		}
	}
}

export default new JwtMiddleware();
