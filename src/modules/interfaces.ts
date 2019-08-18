export interface AuthDatabase {
	host: string;
	name: string;
	username: string;
	password: string;
}

export interface Auth {
	token: string;
	database: AuthDatabase;
}