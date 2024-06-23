import React, { useState } from 'react';
import './App.css';
import CreatePost from './Post/CreatePost';
// import Test from './Test';

function App() {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const toggleBurger = () => {
    setIsBurgerActive(!isBurgerActive);
    console.log('click');
  };



  return (
    <div className="wrapper">
      <div className={`empty_block ${isBurgerActive ? 'active' : ''}`}></div>
      <div className="header"></div>
        {/* Меню сайта */}
        <div className={`btn_right ${isBurgerActive ? 'active' : ''}`}>
          <form action="#">
            <button type="submit" className={`btn ${isBurgerActive ? 'active' : ''}`}>ГЛАВНАЯ</button>
          </form>
          <form action="#">
            <button type="submit" className={`btn ${isBurgerActive ? 'active' : ''}`}>БЛОГ</button>
          </form>
          <form action="#">
            <button type="submit" className={`btn ${isBurgerActive ? 'active' : ''}`}>ИСТОРИИ</button>
          </form>
          <form action="#">
            <button type="submit" className={`btn ${isBurgerActive ? 'active' : ''}`}>ИДЕИ</button>
          </form>
        </div>

      {/* Иконка бургер меню */}
      <button className={`burgerButton ${isBurgerActive ? 'active' : ''}`} onClick={toggleBurger}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className='content'>
        <div className='createPost'>
          <CreatePost />
        </div>
      
      
      </div>
    </div>
  );
}

export default App;







// import React from 'react';
// import './App.css';
// import foto from './foto.png';
// import YandexMap from './YandexMap';



// const ScrollContainer = () => {
//   return (
//     <div className="scroll-container">
//       {/* {children} */}
//       <img src={foto} alt='описание '/>
//       <YandexMap />
//     </div>
//   );
// };

// export default ScrollContainer;

