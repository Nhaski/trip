import React, {useState, useRef} from "react";
import Lenta from '../Lenta/Lenta';
import './Vhod.css'

function Vhod( {VhodBtnRef, VhodDoneBtnRef, VhodTextAdminRef } ) {
    const inputLoginRef = useRef();
    const inputPasswordRef = useRef();
    const [LentaOpen, setLentaOpen] = useState(false);
    const [VhodOpen, setVhodOpen] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const EditRef = useRef();

    function buttonGo () {
        const inputLoginRefValue = inputLoginRef.current.value;
        const inputPasswordRefValue = inputPasswordRef.current.value;
        if (inputLoginRefValue == 'a' & inputPasswordRefValue == '1' ) {
            VhodBtnRef.current.style.display = 'none'; // Изменяем цвет фона кнопки
            VhodDoneBtnRef.current.style.display = 'flex'; 
            VhodTextAdminRef.current.style.display = 'flex';
            if (EditRef.current) {
                EditRef.current.style.display = 'flex';
            }
            console.log(EditRef);
            // setInputValue('');
            setVhodOpen(false);
        }
    }
    // вывод в консоль value input при клике enter
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
    const handleKeyPress = (event) => {
        const inputLoginRefValue = inputLoginRef.current.value;
        const inputPasswordRefValue = inputPasswordRef.current.value;
      if (event.key === 'Enter' && inputLoginRefValue == 'a' && inputPasswordRefValue == '1') {
        // setInputValue('');
        // setLentaOpen(true);
        setVhodOpen(false);
        VhodBtnRef.current.style.display = 'none'; // Изменяем цвет фона кнопки
        VhodDoneBtnRef.current.style.display = 'flex'; 
        VhodTextAdminRef.current.style.display = 'flex';

        if (EditRef.current) {
            EditRef.current.style.display = 'flex';
        }
        console.log(EditRef);
    }
    };
  

return(
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
        {LentaOpen && <Lenta EditRef={EditRef}/>}
        {/* <Lenta EditRef={EditRef}/> */}

    </div>
);
}

export default Vhod;
