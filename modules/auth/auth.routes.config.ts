import express from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import ValidationMiddleware from "./middleware/auth.validation.middleware";
import AuthValidationMiddleware from "./middleware/auth.middleware";
import authController from "./controllers/auth.controller";
import { API_VERSION } from "../../config/env";

export class AuthRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, "AuthRoutes");
	}

	configureRoutes(): express.Application {
		this.app.post(`${API_VERSION}/auth`, [
			ValidationMiddleware.LoginValidator,
			AuthValidationMiddleware.verifyUserPassword,
			authController.createJWT,
		]);

		return this.app;
	}
}
