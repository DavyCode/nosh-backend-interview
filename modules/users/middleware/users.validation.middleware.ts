import express from "express";
import Joi from "joi";

class UserValidationMiddleware {
	async CreateUserValidator(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const schema = Joi.object()
			.keys({
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				password: Joi.string().min(8).required(),
				email: Joi.string().email().required(),
			})
			.with("email", "password");

		try {
			await schema.validateAsync(req.body);
			return next();
		} catch (err: any) {
			return res
				.status(400)
				.json({ status: "error", message: `${err.details[0].message}` });
		}
	}

	async TransferValidator(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const schema = Joi.object().keys({
			amount: Joi.number().min(1),
			email: Joi.string().email().required(),
		});

		try {
			await schema.validateAsync(req.body);
			return next();
		} catch (err: any) {
			return res
				.status(400)
				.json({ status: "error", message: `${err.details[0].message}` });
		}
	}
}

export default new UserValidationMiddleware();
