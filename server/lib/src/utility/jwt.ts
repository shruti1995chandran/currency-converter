import { sign, verify } from "jsonwebtoken";
import { Configuration } from "./config";

class JWT {
  verify(token: string): Promise<JWTUtility.JWTDecoded> {
    return new Promise((resolve, reject) => {
      verify(token, Configuration.JWT_SECRET, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded as unknown as JWTUtility.JWTDecoded);
      });
    });
  }

  sign(data: string): string {
    return sign(
      {
        data,
      },
      Configuration.JWT_SECRET,
      { expiresIn: Configuration.JWT_EXPIRY }
    );
  }
}

export const jwt = new JWT();
