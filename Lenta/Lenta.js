import React, { useState } from "react";
import CreatePost from "../CreatePost/CreatePost";
import './Lenta.css';

function Lenta () {

    const [createBtnActive, setcreateBtnActive] = useState(true);
    const [CreatePostOpen, setCreatePostOpen] = useState(false);

    const [newPost, setNewPost] = useState([]);

    const addPost = () => {
        const nextPost = {
            id: newPost.length + 1, // Уникальный ID для каждого объекта
            };
            setNewPost([...newPost, nextPost]); // Добавление нового объекта в массив
            setcreateBtnActive(!createBtnActive);
    };



    const BTNCreate = (e) => { 
        e.preventDefault();
        setcreateBtnActive(!createBtnActive);
        setCreatePostOpen(!CreatePostOpen);
        console.log('click');
    }

    return (
        <div className="wrapper">
            <button 
                className={`createBtn `}
                onClick={BTNCreate}
            >
                +
            </button>

            <div className={`lenta ${createBtnActive ? 'active' : ''}`}>
                <div className='post'>
                    <div className='postImg'>Lenta</div>
                    <div className='postCommit'>
                        г. Владивосток. Мы прилетели в феврале.
                    </div>
                </div>
            </div>

            {CreatePostOpen && <CreatePost />}





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