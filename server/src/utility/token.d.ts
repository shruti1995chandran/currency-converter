declare namespace JWTUtility {
  interface JWTDecoded {
    data: string;
    iat: number;
    exp: number;
  }
}
