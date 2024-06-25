import React, {useState} from "react";
import './CreatePost.css'

function CreatePost() {
    const [createBtnActive, setcreateBtnActive] = useState(true);
    const [inputText, setInputText] = useState('');
    const [writeText, setWriteText] = useState([]); 
    const [nextId, setNextId] = useState(() => {
        const savedNextId = ('nextId');
        return savedNextId ? (savedNextId, 1) : 1;
    });

    const addPost = () => {
        const newWriteText = { id: nextId, name: `${inputText}` };
        setWriteText(prevWriteText => [...prevWriteText, newWriteText]);
        setNextId(nextId + 1); // Увеличиваем nextId на единицу
        setcreateBtnActive(!createBtnActive);
        setInputText(''); // очищаем поле ввода
    };


    return(
    <div className={`createPost`}>
        createPost
        <input 
            type="text"
            className='createCommments' 
            placeholder='описание к фото' 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
        > 
        </input>
        <button 
            className='CreateBtn' 
            onClick={addPost}>
            создать пост 
        </button>                
        <>
            {writeText.map((text) => (
            <div className="NewPost" key={text.id}>
                <div className='NewPostImg'>новый пост</div>
                    <div className='NewPostComments'>
                </div>
                {text.name}</div>
            ))}
        </>
    </div>


    );
}

export default CreatePost;








// import React, { useRef, useState, useEffect } from "react";
// import './App.css';

// function App() {
//     const [name, setName] = useState('');
//     const [product, setProducts] = useState([]); 
//     const [nextId, setNextId] = useState(() => {
//         const savedNextId = ('nextId');
//         return savedNextId ? (savedNextId, 1) : 1;
//       });

// const handleAddProduct = () => {
//     const newProduct = { id: nextId, name: `${nextId}: ${name}` };
//     setProducts(prevProducts => [...prevProducts, newProduct]);
//     setNextId(nextId + 1); // Увеличиваем nextId на единицу
//     setName(''); // очищаем поле ввода
//     console.log([...product, newProduct]); // Выводим обновленный массив product
//   };
  
//   return (
//     <>
        // <h1>Список покупок:</h1>
        // <input
        //     type="text"
        //     value={name}
        //     onChange={(e) => setName(e.target.value)}
        // />
        // <button onClick={handleAddProduct}>Добавить</button>
        // <ul>
        //     {product.map((product) => (
        //       <div className="cardProduct" key={product.id}>{product.name}</div>
        //     ))}
        // </ul>
//     </>
// );
// }

// export default App;
