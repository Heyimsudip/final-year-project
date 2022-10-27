import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

function useGeoLocation() {
    const history = useHistory();
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {latitude: "", longitude: ""}
    });

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
        })
    }

    const onError = error => {
        setLocation({
            loaded: false,
            error,
        })
        history.push("/");
    }

    useEffect(() => {
        if(!("geolocation" in navigator)){
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

  return location;
}

export default useGeoLocation