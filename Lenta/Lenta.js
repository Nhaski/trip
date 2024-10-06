import React, { useState, useRef, useEffect } from "react";
// import Vhod from '../Vhod/Vhod';
import './Lenta.css';

const Lenta = ({ EditRef, wrapperLentaRef }) => {

    const [emptyBlockActive, setEmptyBlockActive] = useState(false);
    const [CreatePostOpen, setCreatePostOpen] = useState(false);
    const [activeText, setActiveText] = useState(false); // открытие текста при нажатии кнопки подробнее
    const [EditThisPostOpen, setEditThisPostOpen] = useState(false); // окно редактирования поста
    const [EditWindowOpen, setEditWindowOpen] = useState(false);

    const [createBtnActive, setCreateBtnActive] = useState(true);
    const [newPostActive, setNewPostActive] = useState(true);

    const [activeEditId, setActiveEditId] = useState(null);

    const [editText, setEditText] = useState(''); // состояние для редактируемого текста
    const [editRespublic, setEditRespublic] = useState(''); // состояние для редактируемой республики
    const [editTown, setEditTown] = useState(''); // состояние для редактируемого города
    const [editDate1, setEditDate1] = useState(''); // состояние для редактируемой даты 1
    const [inputText, setInputText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [textHeight, setTextHeight] = useState(600); // начальная высота textHeight

    const [nextId, setNextId] = useState(() => {
        const savedNextId = localStorage.getItem('nextId');
        return savedNextId ? parseInt(savedNextId, 10) : 1;
    });

    const [writeText, setWriteText] = useState(() => {
        const savedPosts = localStorage.getItem('NewCreatingPost');
        return savedPosts ? JSON.parse(savedPosts) : [];
    }); 

    // Обработка выбора поста для редактирования
    const handleEditPost = (id) => {
        setCreateBtnActive(!createBtnActive); // скрыть ленту постов
        setEditThisPostOpen(!EditThisPostOpen); // открыть окно редактирования поста
        const post = writeText.find(post => post.id === id);
        // const day = post.Date1 ? post.Date1.split('-')[2] : ''; // Извлечение дня
        if (post) {
            setEditText(post.Text); // Передаем текст поста в состояние
            setEditRespublic(post.Respublic); // Передаем республику поста в состояние
            setEditTown(post.Town); // Передаем республику поста в состояние
            setEditDate1(post.Date1);
            setImageUrl(post.image);
            setActiveEditId(id);     // Устанавливаем активный пост для редактирования
        }
    };

    // Обработка изменения текста в поле ввода
    const handleInputChange = (e) => {
        setEditText(e.target.value); // Обновляем текст в поле ввода при его изменении (открытие разных постов)
    };

    // Обработка изменения республики в поле ввода
    const handleRespublicChange = (e) => {
        setEditRespublic(e.target.value); // Обновляем состояние Республики
    };

    // Обработка изменения города в поле ввода
    const handleTownChange = (e) => {
        setEditTown(e.target.value); // Обновляем состояние Республики
    };

    // Обработка изменения даты1 в поле ввода
    const handleDate1Change = (e) => {
        setEditDate1(e.target.value); // Обновляем состояние даты
    };

    // Обработка изменения даты1 в поле ввода
    const handleImageChange = (e) => {
        setImageUrl(e.target.value); // Обновляем состояние фото
    };

    // Обработка сохранения изменений поста
    const editPost = () => {
        setCreateBtnActive(!createBtnActive);
        setEditThisPostOpen(!EditThisPostOpen);
        if (activeEditId !== null) {
            const dayOnly = editDate1 ? editDate1.split('-')[2] : ''; // предполагаем, что формат даты "YYYY-MM-DD"
            // Копируем массив постов и обновляем текст нужного поста
            const updatedPosts = writeText.map(post =>
                post.id === activeEditId ? { ...post, Text: editText, Respublic: editRespublic, Town: editTown, Date1: dayOnly, image: imageUrl} : post
            );
            setWriteText(updatedPosts);  // Обновляем состояние текста 
            localStorage.setItem('NewCreatingPost', JSON.stringify(updatedPosts));  // Сохраняем в localStorage
            setActiveEditId(null);  // Сбрасываем активный пост
            setEditText('');  // Очищаем поле ввода
        }
    };

    useEffect(() => {
        localStorage.setItem('nextId', nextId);
    }, [nextId]);
    useEffect(() => {
        localStorage.setItem('NewCreatingPost', JSON.stringify(writeText));
    }, [writeText]);

    const BTNPlus = (e) => { 
        e.preventDefault();
        setCreateBtnActive(!createBtnActive);
        setCreatePostOpen(!CreatePostOpen);
        setImageUrl(''); // очищаем поле ввода        
    };    

    const Respublik_Ref = useRef();
    const Town_Ref = useRef();
    const Date1_Ref = useRef();
    const Date2_Ref = useRef();
    const textRef = useRef(null);

    const addPost = () => {
        // проверка если республика или город или даты не null то выполнять рендер
        if (
            Respublik_Ref.current &&
            Town_Ref.current &&
            Date1_Ref.current &&
            Date2_Ref.current
        ) {
        const Respublic_Value = Respublik_Ref.current.value;
        const Town_Value = Town_Ref.current.value;

        let year1 = Date1_Ref.current.value[0] + Date1_Ref.current.value[1] + Date1_Ref.current.value[2] + Date1_Ref.current.value[3];
        let month1 = Date1_Ref.current.value[5] + Date1_Ref.current.value[6];
        let day1 = Date1_Ref.current.value[8] + Date1_Ref.current.value[9];

        let year2 = Date2_Ref.current.value[0] + Date2_Ref.current.value[1] + Date2_Ref.current.value[2] + Date2_Ref.current.value[3];
        let month2 = Date2_Ref.current.value[5] + Date2_Ref.current.value[6];
        let day2 = Date2_Ref.current.value[8] + Date2_Ref.current.value[9];

        const monthNames = [
            'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
            'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
        ];
        month1 = monthNames[parseInt(month1, 10) - 1];
        
        const newWriteText = { 
            id: nextId, 
            Respublic: Respublic_Value, 
            Town: Town_Value, 
            Date1: day1, 
            Date2: day2, 
            Month1: month1, 
            Year2: year2, 
            Text: inputText, 
            image: imageUrl 
        };
        setWriteText(prevWriteText => [...prevWriteText, newWriteText]);
        setNextId(nextId + 1); // Увеличиваем nextId на единицу
        setCreateBtnActive(!createBtnActive);
        setCreatePostOpen(!CreatePostOpen);
        setInputText(''); // очищаем поле ввода
        setImageUrl(''); // очищаем поле ввода
        Date1_Ref.current.value = '';
        Date2_Ref.current.value = '';
    } else {
        console.error('One of the refs is null.');
    }
};

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setImageUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }        
    };

    const deletePost = () => {
        if (activeEditId !== null) {
            // Отфильтровываем массив, исключая пост с activeEditId
            const updatedPosts = writeText.filter(post => post.id !== activeEditId);
            setWriteText(updatedPosts);  // Обновляем состояние
            localStorage.setItem('NewCreatingPost', JSON.stringify(updatedPosts));  // Сохраняем обновленный массив в localStorage
            setActiveEditId(null);  // Сбрасываем активный пост
            setEditText('');  // Очищаем поле ввода
            setEditThisPostOpen(false);  // Закрываем окно редактирования (если требуется)
        }
    };
    
    const Podrobnee = () => {
        setActiveText(!activeText); // открытие/закрытие текста
        setTextHeight(textHeight);
        const NEWHeightTEXT = textRef.current.scrollHeight; // получаем высоту текста
        console.log(NEWHeightTEXT);
    }    

    const toggleEmptyBlock = () => {
        setEmptyBlockActive(!emptyBlockActive);
    };
    const closeEditWindow = () => {
        setEditWindowOpen(!EditWindowOpen);
    }
    
    const EditClick = (id) => {
        setActiveEditId(activeEditId === id ? null : id);
    };

    return (
        //  окно ленты 
        <div className={`wrapperLenta`} ref={wrapperLentaRef}>
        <div className={`EmptyBlock ${emptyBlockActive ? 'active' : ''} `} onClick={() => {toggleEmptyBlock(); closeEditWindow();}}></div>
            <button 
                className={`PlusBtn`}
                onClick={BTNPlus}
                text="+" 
                hover-text="создать пост"
            >
            </button>

            <div className={`lenta ${createBtnActive ? 'active' : ''}`} >
                <div className={`lentaPost `} ref={textRef} style={{ 
                    height: `${textHeight}px` + `${textHeight}px`,
                }}>
                    <div className='lentaPostImg'>
                    <img 
                        className={`lentaPostImg`}
                        width="640" 
                        height="350" 
                        // src="https://visited.ru/rumap.php?visited=RDARKCRTARCEKDAPRIVLAVGGVORKGDKLUKRSLENMOSNIZROSRYASAMTVETULYAR"
                        src={`${process.env.PUBLIC_URL}/map.jpg`}
                        border="0">
                    </img>
                    </div>
                    <div className='lentaPostComments'>
                        <div>
                            <h4> Край: 
                                <div className="edit" ref={EditRef} onClick={EditClick} style={{backgroundColor: 'lightgrey'}}>...</div>
                            </h4>
                        </div>
                        <h6> Город: Владивосток</h6>
                        <div className="postData">
                            &#128467;<p> 6-15 February 2024</p>
                        </div>
                        <p className={`postParagraph `} >
                            г. Владивосток. Посещенные места: о. Русский, Золотой мост, Русский мост. 
                            Владивосток с трех сторон окружен морем, так что первым делом можно отправиться 
                            гулять
                            </p> 
                        <span id="dots1"></span>
                        <span id="more1">
                            
                        <p className={`postParagraph2 ${activeText ? 'active' : ''}`} >    
                            по набережным: Спортивной, Корабельной, или Цесаревича. Или постройте 
                            маршрут по улицам Светланской, Алеутской и местному Арбату – улице Адмирала Фокина. 
                            Обязательно прогуляйтесь по главной площади города — Борцов революции и пройдите до Миллионки 
                            (бывший китайский квартал), чтобы сделать колоритные фото. Не забудьте и про остров Русский.
                        </p>
                        </span>

                        <button 
                            text="Подробнее ..." 
                            className={`PodrobneeClassname`}
                            onClick={Podrobnee}
                        >  
                        </button>
                    </div>
                </div>
                <div className={`EditWindow ${EditWindowOpen ? 'active' : ''}`} >
                    <button className="EditChangeBtn"> Редактировать </button>
                    <button className="EditDeleteBtn"> Удалить </button>
                </div>


                {/* созданный новый пост */}
                {writeText.map((NewCreatePost) => (
                    <div className={`NewPost ${newPostActive ? 'active' : ''}`} key={NewCreatePost.id}>
                        <div className={`NewPostImg`}>
                            <img 
                                className={`Img`}
                                src={NewCreatePost.image}
                                id={NewCreatePost.id}
                            />  
                        </div>
                        <div className='NewPostComments'>
                            <div className="NewPostZagolovok">
                                <h6> {NewCreatePost.Respublic} / {NewCreatePost.Town} </h6>
                                <p className="postData"> &#128467; {NewCreatePost.Date1} - {NewCreatePost.Date2} {NewCreatePost.Month1} {NewCreatePost.Year2} </p>  
                                <div 
                                    className="edit" 
                                    id={NewCreatePost.id} 
                                    onClick={() => {toggleEmptyBlock(); closeEditWindow(); setActiveEditId (NewCreatePost.id) } } 
                                    style={{backgroundColor: 'lightgrey'}}
                                >...</div>
                                {activeEditId === NewCreatePost.id && (
                                    <div className={`EditWindow ${EditWindowOpen ? 'active' : ''}`} >
                                        <button 
                                            className="EditChangeBtn" 
                                            onClick={() => handleEditPost(NewCreatePost.id)}
                                            > Редактировать 
                                        </button>

                                        <button className="EditDeleteBtn" onClick={deletePost}> Удалить </button>
                                    </div>
                                )}
                            </div>
                            <p> {NewCreatePost.Text} </p>
                        </div>
                    </div>
                ))}
            </div>
            {/* окно создания поста */}
            <div className={`createPost ${CreatePostOpen ? 'active' : ''}`}>
                <img 
                    src={imageUrl}
                    className="CreatePostImg"
                />
                <label htmlFor="owner">Республика/Область:
                    <select className="SelectObjectRF" ref={Respublik_Ref}>
                        <option className="Respyblika" value="Республика Адыгея">Республика Адыгея</option>
                        <option className="Respyblika" value="Республика Алтай">Республика Алтай</option>
                        <option className="Respyblika" value="Республика Башкортостан">Республика Башкортостан</option>
                        <option className="Respyblika" value="Республика Дагестан">Республика Дагестан</option>
                        <option className="oblast" value="Владимирская область" >Владимириская область</option>
                        <option className="oblast" value="Воронежская область" >Воронежская область</option>
                        <option className="oblast" value="Калининградская область" >Калининградская область</option>
                        <option className="oblast" value="Сахалинская область" >Сахалинская область</option>
                    </select>
                </label>
                <label htmlFor="owner">Город:
                    <select className="SelectObjectRF" ref={Town_Ref}>
                        <option className="Town" value="Воронеж">Воронеж</option>
                        <option className="Town" value="Калининград">Калининград</option>
                        <option className="Town" value="Махачкала">Махачкала</option>
                        <option className="Town" value="Тверь">Тверь</option>
                        <option className="Town" value="Казань">Казань</option>
                        <option className="Town" value="Владивосток" >Владивосток</option>
                        <option className="Town" value="Тула" >Тверь</option>
                        <option className="Town" value="Южно-Сахалинск" >Южно-Сахалинск</option>
                    </select>
                </label>
                <label htmlFor="owner">Даты с:
                    <input type="date" ref={Date1_Ref} className="SelectObjectRF"/>
                </label>
                <label htmlFor="owner">Даты по:
                    <input type="date" ref={Date2_Ref} className="SelectObjectRF"/>
                </label>
                <div className="CreateCommentsPost">
                    <label htmlFor="fileUploaderButtonID" className="fileUploaderButtonCustom">
                        {/* символ скрепки */}
                        &#128206; 
                    </label>
                    <input 
                        id="fileUploaderButtonID"
                        className="fileUploaderButton"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <input 
                        type="text"
                        className='createCommments' 
                        placeholder='описание к фото' 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    /> 
                    <button 
                        className='CreateBtn' 
                        onClick={addPost}>
                        {/* символ стрелки */}
                        &#8593;
                    </button>  
                </div>
            </div>

            {/* окно редактирования поста */}
            {activeEditId !== null && (
                <div className={`Edit_This_Post ${EditThisPostOpen ? 'active' : ''}`}>
                    <img 
                        className="CreatePostImg"
                        src={imageUrl}
                    />
                    <label htmlFor="owner">Window Edit Post
                        <select className="SelectObjectRF" ref={Respublik_Ref} value={editRespublic} onChange={handleRespublicChange}>
                            {/* <option className="Respyblika" > {editRespublic} </option> */}
                            <option className="Respyblika" value="Республика Адыгея">Республика Адыгея</option>
                            <option className="Respyblika" value="Республика Алтай">Республика Алтай</option>
                            <option className="Respyblika" value="Республика Башкортостан">Республика Башкортостан</option>
                            <option className="Respyblika" value="Республика Дагестан">Республика Дагестан</option>
                            <option className="oblast" value="Владимирская область" >Владимириская область</option>
                            <option className="oblast" value="Воронежская область" >Воронежская область</option>
                            <option className="oblast" value="Калининградская область" >Калининградская область</option>
                            <option className="oblast" value="Сахалинская область" >Сахалинская область</option>
                        </select>
                    </label>
                    <label htmlFor="owner">Город:
                        <select className="SelectObjectRF" ref={Town_Ref} value={editTown} onChange={handleTownChange}>
                            <option className="Town" value="Воронеж">Воронеж</option>
                            <option className="Town" value="Калининград">Калининград</option>
                            <option className="Town" value="Махачкала">Махачкала</option>
                            <option className="Town" value="Тверь">Тверь</option>
                            <option className="Town" value="Казань">Казань</option>
                            <option className="Town" value="Владивосток" >Владивосток</option>
                            <option className="Town" value="Тула" >Тверь</option>
                            <option className="Town" value="Южно-Сахалинск" >Южно-Сахалинск</option>
                        </select>
                    </label>
                    <label htmlFor="owner">Даты с:
                        <input 
                            type="date" 
                            ref={Date1_Ref} 
                            className="SelectObjectRF"
                            value={editDate1} 
                            onChange={handleDate1Change}
                        />
                    </label>
                    <label htmlFor="owner">Даты по:
                        <input type="date" ref={Date2_Ref} className="SelectObjectRF"/>
                    </label>
                    <div className="CreateCommentsPost">
                        <label htmlFor="fileUploaderButtonID" className="fileUploaderButtonCustom">
                            {/* символ скрепки */}
                            &#128206; 
                        </label>
                        <input 
                            id="fileUploaderButtonID"
                            className="fileUploaderButton"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <input 
                            type="text"
                            className='createCommments' 
                            placeholder='описание к фото' 
                            value={editText} // Связываем поле ввода с состоянием
                            onChange={handleInputChange} // Обновляем состояние при изменении ввода
                        /> 
                        <button 
                            className='CreateBtn' 
                            onClick={editPost}>
                            &#8593; {/* символ стрелки */}
                        </button>  
                    </div>
                </div>
            )}

        </div>
        
    );
}

export default Lenta;
