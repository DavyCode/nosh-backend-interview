import "express-async-errors";
import express from "express";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./modules/users/users.routes.config";
import { AuthRoutes } from "./modules/auth/auth.routes.config";
import headerOptions from "./setup/headerOptions";
import { errorHandler } from "./common/utils/errors";
import CheckHeaders from "./modules/auth/middleware/checkHeaders";

import { PORT } from "./config/env";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());
app.use(cors());
app.use(helmet());

const loggerOptions: expressWinston.LoggerOptions = {
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.json(),
		winston.format.prettyPrint(),
		winston.format.colorize({ all: true })
	),
};

if (process.env.DEBUG) {
	process.on("unhandledRejection", function (reason) {
		debugLog("Unhandled Rejection:", reason);
		process.exit(1);
	});
} else {
	loggerOptions.meta = false;
}

app.use(headerOptions);

app.use(expressWinston.logger(loggerOptions));

app.all("/*", CheckHeaders.checkHeadersForAuthorization);

app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // limit each IP to 100 requests per windowMs.
	})
);

routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

app.get("/", (req: express.Request, res: express.Response) => {
	res
		.status(200)
		.send({ message: `Server running on - http://localhost:${PORT}` });
});

app.use(errorHandler);

server.listen(PORT, () => {
	debugLog(`Server running on http://localhost:${PORT}`);
	routes.forEach((route: CommonRoutesConfig) => {
		debugLog(`Routes configured for ${route.getName()}`);
	});
});
