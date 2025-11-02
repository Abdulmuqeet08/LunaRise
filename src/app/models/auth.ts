export class Auth {
	UserID: string;
	UserName: string;
	Email: string;
	RoleID: string;
	IsActive:string;
	roles: string[];
	token: string;
	theme:string;
	scheme:string;
	layout:string;

	constructor(
		UserID: string,
		UserName: string,
		Email: string,
		RoleID: string,
		IsActive:string,
		roles: string[],
		token: string,
		theme:string,
		scheme:string,
		layout:string,
	) {
		this.UserID = UserID;
		this.UserName = UserName;
		this.Email = Email;
		this.RoleID = RoleID;
		this.token = token;
		this.roles = roles;
		this.IsActive=IsActive;
		this.theme=theme;
		this.scheme=scheme;
		this.layout=layout;
	}

	static createGuest() {
		return new Auth('', 'Guest', '', '', '', ['Guest'], '','','','');
	}

	static createFromHash(details: any) {
		return new Auth(
			details.UserID,
			details.UserName,
			details.Email,
			details.RoleID,		
			details.IsActive,
			details.roles,
			details.token,
			details.theme,
			details.scheme,
			details.layout
		);
	}

	
	isAuthenticated() {
		// console.log("-----this values----", this)
		return this.UserID !== '' && this.token !== '';
	}

	isInRole(roles: any) {
		return this.roles.some((role: string) => roles.indexOf(role) >= 0);
	}


	isAdmin(): boolean {
		return this.roles.indexOf('Admin') > -1;
	}


}
