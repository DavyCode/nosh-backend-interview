import express from "express";
import debug from "debug";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION_MINUTES } from "../../../config/env";
import JWTMiddleware from "../middleware/jwt.middleware";

const log: debug.IDebugger = debug("app:auth-controller");

// @ts-expect-error
const jwtSecret: string = JWT_SECRET;
const tokenExpirationInSeconds = JWT_EXPIRATION_MINUTES;

class AuthController {
	async createJWT(req: express.Request, res: express.Response) {
		const user = res.locals.user;
		try {
			const token = JWTMiddleware.genToken(user);

			return res.status(201).send({
				status: "success",
				data: { accessToken: token },
			});
		} catch (err: any) {
			log("createJWT error: %O", err);
			return res
				.status(500)
				.send({ status: "error", message: "Failed to generate Token" });
		}
	}
}

export default new AuthController();
