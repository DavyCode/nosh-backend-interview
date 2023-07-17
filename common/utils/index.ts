class Utils {
	getObjectValues(object: Record<string, any> = {}): Array<any> {
		return Object.values(object);
	}

	cleanUserResponseData(user: any) {
		// TODO: - types annote
		const { passwordHash, __v, ...userData } = JSON.parse(JSON.stringify(user));
		return userData;
	}
}

export default new Utils();
