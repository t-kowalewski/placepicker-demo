import { useRef, useState, useCallback } from 'react';
import useFetch from './hooks/useFetch.js';

import { fetchUserPlaces, updUserPlaces } from './http.js';
import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import ErrorMsg from './components/ErrorMsg.jsx';

function App() {
  const selectedPlace = useRef();

  // const [isLoading, setIsLoading] = useState(false);
  // const [userPlaces, setUserPlaces] = useState([]);
  // const [error, setError] = useState(null);

  const [errUpdPlaces, setErrUpdPlaces] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // async function handleSelectPlace(selectedPlace) {
  //   // Optimistic updating:
  //   // We first update local state and only after - backend (send request and wait for response )
  //   // Often it provides better UX than showing some loading spinners or text. It's an alternative when we updating data but can't be used when we're fetching something and depend on it
  //   setUserPlaces((prevPickedPlaces) => {
  //     if (!prevPickedPlaces) {
  //       prevPickedPlaces = [];
  //     }
  //     if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
  //       return prevPickedPlaces;
  //     }
  //     return [selectedPlace, ...prevPickedPlaces];
  //   });

  //   // send selected places to backend
  //   try {
  //     if (userPlaces.some((place) => place.id === selectedPlace.id)) {
  //       await updUserPlaces(userPlaces);
  //     } else {
  //       await updUserPlaces([selectedPlace, ...userPlaces]);
  //     }
  //   } catch (error) {
  //     // If error occures we simply update state to the current/old one
  //     setUserPlaces(userPlaces);
  //     setErrUpdPlaces({ message: error.message || 'Updating places failed' });
  //   }
  // }

  // const handleRemovePlace = useCallback(
  //   async function handleRemovePlace() {
  //     setUserPlaces((prevPickedPlaces) =>
  //       prevPickedPlaces.filter(
  //         (place) => place.id !== selectedPlace.current.id
  //       )
  //     );

  //     // handle place removing in the backend
  //     try {
  //       await updUserPlaces(
  //         userPlaces.filter((place) => place.id !== selectedPlace.current.id)
  //       );
  //     } catch (error) {
  //       setUserPlaces(userPlaces);
  //       setErrUpdPlaces({ message: error.message || 'Deleting place failed' });
  //     }

  //     setModalIsOpen(false);
  //   },
  //   [userPlaces]
  // );

  const handleErrorModal = () => {
    setErrUpdPlaces(null);
  };

  // Getting user places
  // useEffect(() => {
  //   //send http request > update state when ready
  //   (async function () {
  //     setIsLoading(true);

  //     try {
  //       const places = await fetchUserPlaces();
  //       setUserPlaces(places);
  //     } catch (error) {
  //       setError({
  //         message: error.message || 'Error occured. Please try again later',
  //       });
  //     }
  //     setIsLoading(false);
  //   })();
  // }, []);

  const [isLoading, userPlaces, error] = useFetch(fetchUserPlaces);

  return (
    <>
      {/* Modal showing if upd user places failed */}
      <Modal open={errUpdPlaces} onClose={handleErrorModal}>
        {errUpdPlaces && (
          <ErrorMsg
            title='An error occured'
            message={errUpdPlaces.message}
            onConfirm={handleErrorModal}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          // onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt='Stylized globe' />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>

      <main>
        {error ? (
          <ErrorMsg title='An error occured!' message={error.message} />
        ) : (
          <Places
            title="I'd like to visit ..."
            places={userPlaces}
            isLoading={isLoading}
            loadingText='Fetching user places...'
            fallbackText='Select the places you would like to visit below.'
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        {/* <AvailablePlaces onSelectPlace={handleSelectPlace} /> */}
        <AvailablePlaces />
      </main>
    </>
  );
}

export default App;
