import { useState, useEffect } from 'react';

import { sortPlacesByDistance } from '../loc.js';
import { fetchAwailablePlaces } from '../http.js';
import Places from './Places.jsx';
import ErrorMsg from './ErrorMsg.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //send http request > update state when ready
    (async function () {
      setIsLoading(true);

      try {
        const places = await fetchAwailablePlaces();

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
            setAvailablePlaces(sortedPlases);
            setIsLoading(false);
          },
          // user blocks location
          () => {
            alert("Can't sort places by location");
            setAvailablePlaces(places);
            setIsLoading(false);
          }
        );
      } catch (error) {
        setError({
          message: error.message || 'Error occured. Please try again later',
        });
        setIsLoading(false);
      }
    })();
  }, []);

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
