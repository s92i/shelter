import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react'
import getCenter from 'geolib/es/getCenter'

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })

    return (
        <ReactMapGL mapStyle='mapbox://styles/halex57/cl9tsrpom002v14mitativl43' mapboxAccessToken={process.env.mapbox_key} {...viewport} style={{ width: '100%', height: '100%' }} onMove={(evt) => setViewport(evt.viewState)}>
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker longitude={result.long} latitude={result.lat} offsetLeft={-20} offsetTop={-10}>
                        <p className='cursor-pointer text-2xl animate-bounce' onClick={() => setSelectedLocation(result)} role='img' aria-label='push-pin'>📌</p>
                    </Marker>
                    {selectedLocation.long === result.long ? (
                        <Popup closeOnClick={true} onClose={() => setSelectedLocation({})} latitude={result.lat} longitude={result.long}>{result.title}</Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map