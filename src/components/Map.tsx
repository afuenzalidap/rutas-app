import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

export const Map = () => {

    const [showPolyline, setShowPolyline] = useState(true);

    const {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines
    } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();
        return () => {
            // TODO: Cancelar el seguimiento
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {

        if( !following.current ) return;

        const { latitude, longitude } = userLocation

        mapViewRef.current?.animateCamera({
            center: {
                longitude,
                latitude
            }
        });
    }, [ userLocation ]);

    const centerPosition = async () => {

        const { latitude, longitude } = await getCurrentLocation();

        following.current = true;


        mapViewRef.current?.animateCamera({
            center: {
                longitude,
                latitude
            }
        });
    }
    
    if ( !hasLocation ){
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref = { (el) => mapViewRef.current = el! }
                style = {{ flex: 1 }}
                showsUserLocation = { true }
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart = { () => console.log('touch start') }
            >
                {
                    showPolyline && (
                        <Polyline 
                            coordinates = { routeLines }
                            strokeColor = "black"
                            strokeWidth = { 3 }
                        />
                    )
                }
                {/* <Marker 
                    image = { require('../assets/custom-marker.png') }
                    coordinate = {{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title = "Esto es un titulo"
                    description = "Esto es una descripción"
                /> */}
            </MapView>

            <Fab 
                iconName = "compass-outline"
                onPress = { centerPosition }
                style = {{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />

            <Fab 
                iconName = "brush-outline"
                onPress = { () => setShowPolyline( !showPolyline ) }
                style = {{
                    position: 'absolute',
                    bottom: 80,
                    right: 20
                }}
            />
        </>
    )
}
