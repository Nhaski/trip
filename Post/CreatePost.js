import React, { useState } from "react";
import './CreatePost.css';

function CreatePost () {
    const [inputText, setInputText] = useState('');
    const [comments, setComments] = useState([]);

    const addCommitFoto = () => {
        const newComment = inputText;
        setComments([...comments, newComment]);
        setInputText('');
      }

      return (
        <div className="wrapper">
           {/* <div className='jpgMap'><img src={foto} alt='описание '/></div> */}
            {/* <div className='AddPhoto'></div> */}
            <div className='post'>
            <div className='postImg'></div>
            <div className='postCommit'>
                {comments.map((comment, index) => (
                <p key={index} className='paragraph'>{comment}</p>
                ))}  
            </div>

            </div>
            <input 
                className='commit' 
                placeholder='описание к фото' 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            >
            </input>
            <button 
                className='add' 
                onClick={addCommitFoto}> 
                создать пост 
            </button>
        </div>
      );
}

export default CreatePost;