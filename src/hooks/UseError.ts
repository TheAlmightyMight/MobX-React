import React, { useState } from "react";

const useError = <
  K extends RegExp,
  T extends HTMLInputElement | HTMLTextAreaElement,
>(
  length: number,
  pattern?: K,
): [boolean, (e: React.ChangeEvent<T>) => void] => {
  const [error, setError] = useState<boolean>(false);

  let errorHandler;
  if (pattern) {
    errorHandler = (e: React.ChangeEvent<T>) => {
      if (pattern.test(e.target.value) || e.target.value.length > length) {
        setError(false);
      } else {
        setError(true);
      }
    };
    return [error, errorHandler];
  } else {
    errorHandler = (e: React.ChangeEvent<T>) => {
      if (e.target.value.length > length) {
        setError(true);
      } else {
        setError(false);
      }
    };
    return [error, errorHandler];
  }
};

export default useError;
