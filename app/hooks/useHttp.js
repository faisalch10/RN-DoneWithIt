import { useState } from 'react';

const useAPI = apiRequest => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiRequest(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data);
    return response;
  };

  return {
    loading,
    data,
    error,
    request,
  };
};

export default useAPI;
