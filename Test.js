import React from 'react';
import foto from './foto.png';


const Test = () => {
  return (
    <div>
      <h1>Это мой компонент!</h1>
      <p>Контент компонента.</p>
        <img src={foto} alt='описание '/>
    </div>
  );
};

export default Test;
