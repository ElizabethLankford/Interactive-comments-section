import { useCallback, useEffect, useState } from "react";

export function useAsync(func, dependencies = []) {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true);
  useEffect(() => {
    execute();
  }, [execute]);
  return state;
}

export function useAsyncFN(func, dependencies = []) {
  return useAsyncInternal(func, dependencies, false);
}

function useAsyncInternal(func, dependencies, initalLoading = false) {
  const [loading, setLoading] = useState(initalLoading);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const execute = useCallback((...params) => {
    setLoading(true);
    return func(...params)
      .then((data) => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch((error) => {
        setError(error);
        setValue(undefined);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);
  return { loading, error, value, execute };
}
