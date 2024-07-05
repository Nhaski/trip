import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Home from './Home/Home';
import Lenta from './Lenta/Lenta';
import Vhod from './Vhod/Vhod';

function App() {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [LentaOpen, setLentaOpen] = useState(false);
  const [HomeOpen, setHomeOpen] = useState(true);
  const [VhodOpen, setVhodOpen] = useState(false); 
  const [lastOpen, setLastOpen] = useState('home'); // Новое состояние для отслеживания последнего открытого элемента
  const [inputValue, setInputValue] = useState('');
  const VhodBtnRef = useRef();
  const VhodDoneBtnRef = useRef();
  const VhodTextAdminRef = useRef();
  const inputLoginRef = useRef();
  const inputPasswordRef = useRef();
  const EditRef = useRef();
  const wrapperLentaRef = useRef();

  const HomeClick = (e) => {
    e.preventDefault(); 
    setHomeOpen(true); 
    wrapperLentaRef.current.style.display = 'none'; 
    setVhodOpen(false);
    setLastOpen('home');
    setIsBurgerActive(!isBurgerActive);
  };
  const LentaClick = (e) => {
    e.preventDefault();
    setHomeOpen(false); 
    setVhodOpen(false);
    wrapperLentaRef.current.style.display = 'flex'; 
    setLastOpen('lenta');
    setIsBurgerActive(!isBurgerActive);
  };
  // открываем стр. входа, а после ее закрытия - открываем последнюю открытую страницу
  const VhodPage = (e) => {
    if (VhodOpen) {
      setVhodOpen(false);
      if (lastOpen === 'home') {
        setHomeOpen(true);
      } else if (lastOpen === 'lenta') {
        setLentaOpen(true);
      }
    } else {
      setHomeOpen(false);
      setLentaOpen(false);
      setVhodOpen(true);
    }
  };

  const toggleBurger = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  function buttonGo (event) {
    const inputLoginRefValue = inputLoginRef.current.value;
    const inputPasswordRefValue = inputPasswordRef.current.value;
    if (event.key === 'Enter' && inputLoginRefValue == 'a' & inputPasswordRefValue == '1' ) {
      VhodBtnRef.current.style.display = 'none'; 
      VhodDoneBtnRef.current.style.display = 'flex'; 
      VhodTextAdminRef.current.style.display = 'flex';
      if (EditRef.current) {
          EditRef.current.style.display = 'flex';
      }
      setInputValue('');
      setVhodOpen(false);
    }
  }
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleKeyPress = (event) => {
    const inputLoginRefValue = inputLoginRef.current.value;
    const inputPasswordRefValue = inputPasswordRef.current.value;
    if (event.key === 'Enter' && inputLoginRefValue == 'a' && inputPasswordRefValue == '1') {
      setInputValue('');
      VhodBtnRef.current.style.display = 'none'; // Изменяем цвет фона кнопки
      VhodDoneBtnRef.current.style.display = 'flex'; 
      VhodTextAdminRef.current.style.display = 'flex';
      if (EditRef.current) {
        EditRef.current.style.display = 'flex';
      }
      setVhodOpen(false);
    }
  };

  return (
    <div className="wrapperApp">
      <div className={`empty_block ${isBurgerActive ? 'active' : ''} `} onClick={toggleBurger}></div>
      <div className="header">
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
              onClick={LentaClick}
            >
                ЛЕНТА
            </button>
          </form>

          <form action="#">
            <button type="submit" className={`btn ${isBurgerActive ? 'active' : ''}`}>ИСТОРИИ</button>
          </form>
          <form action="#">
            <button type="submit" className={`btn ${isBurgerActive ? 'active' : ''}`}>ИДЕИ</button>
          </form>
        </div>

        {/* кнопка входа */}
        <div className={`wrapperVhod` }>
          <div className={`inputsVhod ${VhodOpen ? 'active' : ''}`}>
            <input className={`inputLogin` } 
              type="text" 
              placeholder="Login" 
              ref={inputLoginRef}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            ></input>
            <input className="inputPassword" 
              type="password" 
              placeholder="Password"
              ref={inputPasswordRef}
              onKeyDown={handleKeyPress}
            ></input>
            <button className="buttonGo" type="submit" onClick={buttonGo} > Sign in </button>
          </div>
        </div>

        <button onClick={VhodPage} >
          <img 
            className={'Vhodmen'}
            ref={VhodBtnRef}
            src={`${process.env.PUBLIC_URL}/men.jpg`}
          >
          </img>
          <img 
            className={'VhodmenDone'}
            ref={VhodDoneBtnRef}
            src={`${process.env.PUBLIC_URL}/menDone.jpg`}
          >
          </img>
        </button>
        <div className='VhodTextAdminClassname' ref={VhodTextAdminRef} style={{display: 'none'}}>Admin</div>

        {/* Иконка бургер меню */}
        <button className={`burgerButton ${isBurgerActive ? 'active' : ''}`} onClick={toggleBurger}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {HomeOpen && <Home/>}
      {<Lenta EditRef={EditRef} wrapperLentaRef={wrapperLentaRef} />} 
      {/* {VhodOpen && <Vhod VhodBtnRef={VhodBtnRef} VhodDoneBtnRef={VhodDoneBtnRef} VhodTextAdminRef={VhodTextAdminRef}/>} */}
      
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





// // import React from 'react';
// // import './App.css';
// // import foto from './foto.png';
// // import YandexMap from './YandexMap';



// // const ScrollContainer = () => {
// //   return (
// //     <div className="scroll-container">
// //       {/* {children} */}
// //       <img src={foto} alt='описание '/>
// //       <YandexMap />
// //     </div>
// //   );
// // };

// // export default ScrollContainer;

