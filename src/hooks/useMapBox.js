import  { useCallback,useRef,useEffect,useState } from 'react'
import mapboxgl from 'mapbox-gl'
import {v4}from 'uuid'

mapboxgl.accessToken = 'pk.eyJ1Ijoibmljb3J1YmlvOTYiLCJhIjoiY2tuajRseHppMGp2ejJ2cXJ0eWVnY2QwaiJ9.r4fkcnyyy3qIucYUD0Kfkg';


export const useMapBox = (puntoInicial) => {

    const mapDiv = useRef()
    const setRef = useCallback((node)=>{
        mapDiv.current=node;
    },[])

    const marcadores= useRef({})

    //const [mapa,setMapa] = useState()
        const mapa= useRef()
    const [coords,setCoords ] = useState(puntoInicial)


    useEffect(()=>{
        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:[puntoInicial.lng,puntoInicial.lat],
            zoom:puntoInicial.zoom
            });

            mapa.current =map
        

    },[puntoInicial])


    //cuando se mueve el mouse se obtienen los datos
    
    useEffect(()=>{
        mapa.current?.on('move',()=>{
            const {lng,lat}= mapa.current.getCenter()
            setCoords({
                lng:lng.toFixed(4),
                lat:lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)

            }

            )
        })
    },[mapa])


    //agregar marcadores cuando se hace click

    useEffect(()=>{
        mapa.current?.on('click',(ev)=>{
            const {lng,lat} = ev.lngLat;
            const marker = new mapboxgl.Marker();
            marker.id = v4()

            marker
                .setLngLat([lng,lat])
                .addTo(mapa.current)
                .setDraggable(true);
        
            marcadores.current[marker.id] =marker;

            })
    })


    return {
     coords,
     marcadores,
     setRef

    }
}
