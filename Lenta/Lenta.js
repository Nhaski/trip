import React, { useState } from "react";
// import CreatePost from "../CreatePost/CreatePost";
import './Lenta.css';

function Lenta () {

    // const [createBtnActive, setcreateBtnActive] = useState(true);
    const [CreatePostOpen, setCreatePostOpen] = useState(false);
    const BTNPlus = (e) => { 
        e.preventDefault();
        setcreateBtnActive(!createBtnActive);
        setCreatePostOpen(!CreatePostOpen);
        console.log('click');
    }

    const [createBtnActive, setcreateBtnActive] = useState(true);
    const [newPostActive, setnewPostActive] = useState(true);
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
        setCreatePostOpen(!CreatePostOpen);
        // setnewPostActive(!newPostActive);
        setInputText(''); // очищаем поле ввода
    };

    return (
        <div className="wrapper">
            <button 
                className={`PlusBtn`}
                onClick={BTNPlus}
            >
                +
            </button>
            <div className={`lenta ${createBtnActive ? 'active' : ''}`}>
                <div className='lentaPost'>
                    <div className='lentaPostImg'>Lenta</div>
                    <div className='lentaPostComments'>
                        г. Владивосток. Мы прилетели в феврале.
                    </div>
                </div>

                <>
                    {writeText.map((text) => (
                        <div className={`NewPost ${newPostActive ? 'active' : ''}`} key={text.id}>
                            <div className='NewPostImg'>картинка нового поста</div>
                                <div className='NewPostComments'>
                                {text.name}
                            </div>
                        </div>
                    ))}
                </>
            </div>
            {/* {CreatePostOpen && <CreatePost />} */}



            <div className={`createPost ${CreatePostOpen ? 'active' : ''}`}>
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

            </div>



        </div>
      );
}

export default Lenta;




// import React, {useState} from "react";
// import './CreatePost.css'

// function CreatePost() {
//     const [inputText, setInputText] = useState('');
//     const [createBtnActive, setcreateBtnActive] = useState(false);

//     const [comments, setComments] = useState([]);

//     const [newPost, setNewPost] = useState([]);
//     const nextPost = {id: newPost.length + 1}; // Уникальный ID для каждого объекта 

//     function addPost () {
//             setNewPost([...newPost, nextPost]); // Добавление нового объекта в массив
//             setcreateBtnActive(!createBtnActive);

//             setComments([...comments, inputText]);
//             setInputText('');
//             console.log(nextPost);
//     };


//     return(

//     <div className={`createPost`}>
//         createPost
//         <input 
//             type="text"
//             className='createCommments' 
//             placeholder='описание к фото' 
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//         > 
//         </input>
//         <button 
//             className='CreateBtn' 
//             onClick={addPost}>
//             создать пост 
//         </button>


//         <>
//             {newPost.map((newPost) => (
//                 <div className='NewPost'>
//                     <div className='NewPostImg'>новый пост</div>
//                     <div 
//                         className='NewPostComments'
//                         key={newPost.id}
//                     >
//                         {comments.map((component, index) => (
//                         <p key={index}> {component} </p>
//                         ))} 
                         
//                     </div>
//                 </div>
//             ))}
//         </>        
//     </div>


//     );
// }

// export default CreatePost;