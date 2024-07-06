import React, { useState, useRef, useEffect } from "react";
// import Vhod from '../Vhod/Vhod';
import './Lenta.css';

const Lenta = ({ EditRef, wrapperLentaRef }) => {
    const [CreatePostOpen, setCreatePostOpen] = useState(false);
    const [activeText, setActiveText] = useState(false)
    const [createBtnActive, setCreateBtnActive] = useState(true);
    const [newPostActive, setNewPostActive] = useState(true);
    const [EditWindowOpen, setEditWindowOpen] = useState(true);
    const [activeEditId, setActiveEditId] = useState(null);

    const [textHeight, setTextHeight] = useState(600); // начальная высота textHeight
    const [inputText, setInputText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [writeText, setWriteText] = useState(() => {
        const savedPosts = localStorage.getItem('NewCreatingPost');
        return savedPosts ? JSON.parse(savedPosts) : [];
    }); 

    const Respublik_Ref = useRef();
    const Town_Ref = useRef();
    const Date1_Ref = useRef();
    const Date2_Ref = useRef();
    const textRef = useRef(null);

    const [nextId, setNextId] = useState(() => {
        const savedNextId = localStorage.getItem('nextId');
        return savedNextId ? parseInt(savedNextId, 10) : 1;
    });

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

    const addPost = () => {
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
            image: imageUrl };
        setWriteText(prevWriteText => [...prevWriteText, newWriteText]);
        setNextId(nextId + 1); // Увеличиваем nextId на единицу
        setCreateBtnActive(!createBtnActive);
        setCreatePostOpen(!CreatePostOpen);
        setInputText(''); // очищаем поле ввода
        setImageUrl(''); // очищаем поле ввода
        Date1_Ref.current.value = '';
        Date2_Ref.current.value = '';
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

    const Podrobnee = () => {
        setActiveText(!activeText); // открытие/закрытие текста
        setTextHeight(textHeight);
        const NEWHeightTEXT = textRef.current.scrollHeight; // получаем высоту текста
        console.log(NEWHeightTEXT);
    }
    const EditClick = (id) => {
        setActiveEditId(activeEditId === id ? null : id);
    };
    

    return (
        //  окно ленты 
        <div className={`wrapperLenta`} ref={wrapperLentaRef}>
            <button 
                className={`PlusBtn`}
                onClick={BTNPlus}
                text="+" 
                hover-text="создать пост"
            >
            </button>
            <div className={`lenta ${createBtnActive ? 'active' : ''}`} >
                {/* <div className={`lentaPost `} ref={textRef} style={{ 
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
                </div> */}
                {/* <div className={`EditWindow ${EditWindowOpen ? 'active' : ''}`} >
                    <button className="EditChangeBtn"> Редактировать </button>
                    <button className="EditDeleteBtn"> Удалить </button>
                </div> */}


                {/* созданный новый пост */}
                {writeText.map((NewCreatePost) => (
                    <div className={`NewPost ${newPostActive ? 'active' : ''}`} key={NewCreatePost.id}>
                        <div className={`NewPostImg`}>
                            <img 
                                className={`Img`}
                                src={NewCreatePost.image}
                            />  
                        </div>
                        <div className='NewPostComments'>
                            <h4> {NewCreatePost.Respublic} </h4>
                                <div 
                                    className="edit" 
                                    id={NewCreatePost.id} 
                                    onClick={() => EditClick (NewCreatePost.id) } 
                                    style={{backgroundColor: 'lightgrey'}}
                                >...</div>
{activeEditId === NewCreatePost.id && (
    <div className={`EditWindow ${EditWindowOpen ? 'active' : ''}`} >
        <button className="EditChangeBtn" > Редактировать </button>
        <button className="EditDeleteBtn"> Удалить </button>
    </div>
)}

                            <h6> {NewCreatePost.Town} </h6>
                            <p className="postData"> &#128467; {NewCreatePost.Date1} - {NewCreatePost.Date2} {NewCreatePost.Month1} {NewCreatePost.Year2} </p>
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
        </div>
        
    );
}

export default Lenta;
