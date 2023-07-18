import dotenv from "dotenv";

// Load .env
dotenv.config();

export const {
	PORT,
	JWT_SECRET,
	JWT_EXPIRATION_MINUTES,
	JWT_BEARER,
	JWT_REFRESH_TIME,
	DBURL,
	API_VERSION,
	NODE_ENV,
	REDIS_URL,
} = process.env;
