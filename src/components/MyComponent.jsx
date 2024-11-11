import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://9669-112-196-16-34.ngrok-free.app/comparison/compare-documents', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        // Try to parse the JSON response
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data from API:</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default MyComponent;


