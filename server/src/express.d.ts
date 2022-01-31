declare namespace Express {
  interface CustomResponse extends Express.Response {
    locals: {
      userInfo: JWTUtility.JWTDecoded;
    };
  }
}
