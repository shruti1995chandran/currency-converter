declare namespace Express {
  interface CustomResponse extends Express.Response {
    locals: {
      user: JWTUtility.JWTDecoded;
    };
  }
}
