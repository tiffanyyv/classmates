import { useState, useEffect } from 'react';

function useFetch(url, methodType, headers) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setApiData(json);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false);
      })
  }, [url])

  return { isLoading, error, apiData }
}

// example use case
// const { apiData, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/todos')