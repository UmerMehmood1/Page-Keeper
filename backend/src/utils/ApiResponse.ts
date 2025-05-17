interface ApiResponse<T> {
  statusCode: number;
  data?: T | null;
  message?: string;
  success?: boolean;
}

export const ApiResponse = <T>(
  statusCode: number,
  data?: T | null,
  message?: string,
  success?: boolean
): ApiResponse<T> => {
  return {
    statusCode,
    data,
    message,
    success,
  };
};
