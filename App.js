import React, { useState } from 'react';
import './App.css';
import Home from './Home/Home';
import Lenta from './Lenta/Lenta';
// import CreatePost from './CreatePost/CreatePost';


function App() {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [LentaOpen, setLentaOpen] = useState(false);
  // const [CreatePostOpen, setCreatePostOpen] = useState(false);
  const [HomeOpen, setHomeOpen] = useState(true);

  const HomeClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    setHomeOpen(true); // Открываем компонент CreatePost
    setLentaOpen(false); // Открываем компонент CreatePost
    setIsBurgerActive(!isBurgerActive);
  };
  const BlogClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    setHomeOpen(false); // Открываем компонент CreatePost
    setLentaOpen(true); // Открываем компонент CreatePost
    setIsBurgerActive(!isBurgerActive);
  };

  const toggleBurger = () => {
    setIsBurgerActive(!isBurgerActive);
    console.log('click');
  };

  return (
    <div className="wrapper">
      <div className={`empty_block ${isBurgerActive ? 'active' : ''} `} onClick={toggleBurger}></div>
      <div className="header"></div>
        {/* Меню сайта */}
        <div className={`btn_right ${isBurgerActive ? 'active' : ''}`}>

          <form action="#">
            <button 
              type="submit" 
              className={`btn ${isBurgerActive ? 'active' : ''}`}
              onClick={HomeClick}
            >
              ГЛАВНАЯ
            </button>
          </form>

          <form action='#'>
            <button 
              type="submit" 
              className={`btn ${isBurgerActive ? 'active' : ''} `}
              onClick={BlogClick}
            >
                БЛОГ
            </button>
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
        {HomeOpen && <Home />}
        {LentaOpen && <Lenta />}
        {/* {CreatePostOpen && <CreatePost />} */}
      
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

