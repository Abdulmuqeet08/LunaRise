import { int } from "aws-sdk/clients/datapipeline";

export class Auth {
  id: string;

  name: string;

  loginName: string;

  status: string;

  type: string;

  roles: string[];

  token: string;

  leaderboardId: string;

  leaderboardName: string;

  project: string;

  projectId: string;

  standard: string;

  chId: string;

  section: string;

  constructor(
    id: string,
    name: string,
    loginName: string,
    status: string,
    type: string,
    roles: string[],
    token: string,
    leaderboardId: string = null,
    leaderboardName: string = null,
    project: string,
    projectId: string,
    standard: string,
    chId: string,
    section: string
  ) {
    this.id = id;
    this.name = name;
    this.loginName = loginName;
    this.status = status;
    this.type = type;
    this.roles = roles;
    this.token = token;
    this.leaderboardId = leaderboardId;
    this.leaderboardName = leaderboardName;
    this.project = project;
    this.projectId = projectId;
    this.standard = standard;
    this.chId = chId;
    this.section = section;
  }

  static createGuest() {
    return new Auth('', 'Guest', 'Guest', 'Status', 'type', ['Guest'], '', null, null, '', '', '', '', '');
  }

  static createFromHash(details: any) {
    return new Auth(
      details.id,
      details.name,
      details.loginName,
      details.status,
      details.type,
      details.roles,
      details.token,
      details.leaderboardId,
      details.leaderboardName,
      details.project,
      details.projectId,
      details.standard,
      details.chId,
      details.section
    );
  }

  isAuthenticated() {
    return this.id !== '' && this.token !== '';
  }

  isStudent(): boolean {
    return this.roles.indexOf('Student') > -1;
  }

  isTrainer(): boolean {
    return this.roles.indexOf('Trainer') > -1;
  }

  isInRole(roles: any) {
    return this.roles.some((role: string) => roles.indexOf(role) >= 0);
  }
}
