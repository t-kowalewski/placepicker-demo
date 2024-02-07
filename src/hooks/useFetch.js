import { useEffect, useState } from 'react';

//send http request > update state when ready
function useFetch(fetchFn) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      setIsLoading(true);

      try {
        const fetchedData = await fetchFn();
        setData(fetchedData);
      } catch (error) {
        setError({
          message: error.message || 'Error occured. Please try again later',
        });
      }
      setIsLoading(false);
    })();
  }, [fetchFn]);

  return [isLoading, data, error];
}

export default useFetch;
