/* eslint-disable prefer-rest-params */
import debug from "debug";
import RedisService from "./db/redis.services";
import mongooseService from "./db/mongoose.services";
import { promisify } from "util";

const redisClient = RedisService.getRedis();
const redisGetAsync = promisify(redisClient.get).bind(redisClient);

const log: debug.IDebugger = debug("app:cache-service");

// keep redis connection alive
setInterval(function () {
	redisClient.set("ping", "pong");
}, 1000 * 10); // every 10 min

class CacheService {
	async clearCache(hashKey: string[]) {
		await hashKey.map((hash) => {
			redisClient.del(hash);

			log(`You cleared cache Value:: ${hash}`);
		});

		return true;
	}

	setCache(key: string, value: any, time?: number) {
		if (time) {
			redisClient.set(key, value, "EX", time);
		} else {
			redisClient.set(key, value);
		}
		log(`You SET cache Value ${{ key, value }}`);
	}

	async flushCache() {
		redisClient.flushall(() => {
			log("flushed cache");
		});
	}
}
export default new CacheService();