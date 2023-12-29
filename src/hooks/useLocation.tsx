import { useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Location } from '../interfaces';

export const useLocation = () => {

    let init = {
        latitude: 0,
        longitude: 0
    };

    const [hasLocation, setHasLocation] = useState(false);
    const [heading, setHeading] = useState(0);
    const [initialPosition, setInitialPosition] = useState<Location>(init);
    const [currentUserLocation, setCurrentUserLocation] = useState<Location>(init);
    const [routeLines, setRouteLines] = useState<Location[]>([]);

    const watchID = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        getCurrentLocation()
            .then(location => {
                if (!isMounted.current) return;

                setInitialPosition(location);
                setCurrentUserLocation(location);
                setRouteLines(routes => [...routes, location]);
                setHasLocation(true);
            });
    }, []);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                },
                (err) => reject({ err }),
                {
                    enableHighAccuracy: true,
                    distanceFilter: 10
                }
            );
        });
    };

    const followUserLocation = () => {

        watchID.current = Geolocation.watchPosition(({ coords }) => {
            if (!isMounted.current) return;

            const location: Location = {
                latitude: coords.latitude,
                longitude: coords.longitude
            };

            setCurrentUserLocation(location);
            setRouteLines(routes => [...routes, location]);
            if (coords.heading) setHeading(coords.heading);
        },
            (err) => console.log({ err }),
            {
                distanceFilter: 5
            }
        );
    };

    const stopFollowingUserLocation = () => {
        if (watchID.current) {
            Geolocation.clearWatch(watchID.current);
        }
    };

    return {
        hasLocation,
        heading,
        initialPosition,
        currentUserLocation,
        routeLines,
        getCurrentLocation,
        followUserLocation,
        stopFollowingUserLocation
    };
};