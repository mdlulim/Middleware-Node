declare namespace Express {
  export interface Request {
    user?:
      | {username: string; anonymous: false; roles: string[]}
      | {anonymous: true};
  }

  export interface CustomNodeJSGlobal extends NodeJS.Global {
    myGlobalVariable: unknown;
  }
}
