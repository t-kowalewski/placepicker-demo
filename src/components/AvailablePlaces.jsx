import useFetch from '../hooks/useFetch.js';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAwailablePlaces } from '../http.js';
import Places from './Places.jsx';
import ErrorMsg from './ErrorMsg.jsx';

// Helper function
const fetchAndSort = async () => {
  const places = await fetchAwailablePlaces();

  return new Promise((resolve) => {
    // get user's locations
    navigator.geolocation.getCurrentPosition(
      // user accepts location
      (pos) => {
        const crd = pos.coords;

        const sortedPlases = sortPlacesByDistance(
          places,
          crd.latitude,
          crd.longitude
        );
        resolve(sortedPlases);
      },
      // user blocks location
      () => {
        alert("Can't sort places by location");
        resolve(places);
      }
    );
  });
};

// Component function
export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, availablePlaces, , error] = useFetch(fetchAndSort);

  if (error) {
    return <ErrorMsg title='An error occured!' message={error.message} />;
  }

  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      isLoading={isLoading}
      loadingText='Fetching place data...'
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
