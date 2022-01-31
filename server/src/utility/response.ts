export class CustomResponse {
  public static unauthorized(error: string): ErrorResponse {
    return {
      body: {
        error,
      },
      status: 401,
    };
  }
  public static excessRequest(error: string): ErrorResponse {
    return {
      body: {
        error,
      },
      status: 429,
    };
  }
  public static invalid(error: string): ErrorResponse {
    return {
      body: {
        error,
      },
      status: 400,
    };
  }

  public static internalServerError(): ErrorResponse {
    return {
      body: {
        error: "Internal Server Error",
      },
      status: 500,
    };
  }

  public static success<T>(body: T): SuccessResponse<T> {
    return {
      body,
      status: 200,
    };
  }
}

export interface SuccessResponse<T> {
  body: T;
  status: 200;
}

export interface ErrorResponse {
  body: {
    error: string;
  };
  status: 400 | 401 | 500 | 429;
}
