import { ApolloError, ServerParseError } from "@apollo/client";
import { message } from "antd";

export const onError = ({ networkError }: ApolloError): void => {
  const { statusCode, result } = networkError as ServerParseError & {
    result: {
      error: string;
    };
  };
  if (statusCode && result?.error) {
    message.error(`(${statusCode}) ${result.error}`);
  } else {
    message.error(`Something went wrong`);
  }
};
