/* global ymaps3 */  // Добавьте это для объявления глобальной переменной

import React, { useEffect, useRef } from 'react';

const YandexMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      await ymaps3.ready;
      const { YMap, YMapDefaultSchemeLayer } = ymaps3;

      const map = new YMap(mapRef.current, {
        location: {
          center: [37.588144, 55.733842],
          zoom: 10,
        },
      });

      map.addChild(new YMapDefaultSchemeLayer());
    };

    initMap();
  }, []);

  return (
    <div
      id="map"
      ref={mapRef}
      style={{ width: '600px', height: '400px' }}
    ></div>
  );
};

export default YandexMap;
