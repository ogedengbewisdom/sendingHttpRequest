import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import {fetchAvailablePlaceHandler} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchHandler = async () => {
      setIsLoading(true);
      try {
        const places = await fetchAvailablePlaceHandler()
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });

      } catch (error) {
        setError({ message: error.message || "Try again later" });
        setIsLoading(false);
      }
      
    };
    fetchHandler();
  }, []);

  if (error) {
    return <Error title={"Error"} message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading please wait..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
