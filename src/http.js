// GET alwailable/all places
export async function fetchAwailablePlaces() {
  const res = await fetch('http://localhost:3000/places');

  if (!res.ok) {
    throw new Error('Failed to fetch places');
  }

  const data = await res.json();
  return data.places;
}

// GET user places
export async function fetchUserPlaces() {
  const res = await fetch('http://localhost:3000/user-places');

  if (!res.ok) {
    throw new Error('Failed to fetch user places');
  }

  const data = await res.json();
  return data.places;
}

// PUT - update user places
export async function updUserPlaces(places) {
  // second argument for fetch is configuration object
  // headers - additional meta-data attached to the request
  const res = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places: places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to update user places');
  }

  const data = await res.json();
  return data.message;
}
