import React from 'react'
import { useMapBox } from '../hooks/useMapBox';



const puntoInicial ={
    lng:-70.9217,
    lat:-34.3155,
    zoom:9.54
}



export const MapaPage = () => {



    const {setRef,coords} = useMapBox(puntoInicial)
     
    return (
        <>

        <div className="info">
            lng:{coords.lng} ° lat: {coords.lat} ° zoom : {coords.zoom}

        </div>

        <div 
            ref={setRef}
            className="container-mapa">


        </div>
            
        </>
    )
}
