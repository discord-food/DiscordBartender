class Permission {
	constructor(name, exec, id) {
		this.name = name;
		this.exec = exec;
		this.id = id;
	}
}
exports.permissions = {
	everyone: new Permission("everyone", () => true, 0)
}
exports.getPermission = member => {
	const client = member.client;
	for (const permission of Object.values(exports.permissions).sort((a, b) => b.id - a.id)) {
		if (permission.exec(client, member)) {
			return permission.id;
		}
	}
	return 0;
}