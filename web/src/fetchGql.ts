async function fetchGql(query: string, variables: Object) {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return await response.json();
}

export default fetchGql;
