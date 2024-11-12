import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './Mentorship.css';
import Modal from 'react-modal';
import UserList from '../users/userList/UserList';
import { updateMentorStatus } from '../api/api';

const Mentorship = () => {
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [requestIsOpen, setRequestIsOpen] = useState(false);
    const [reason, setReason] = useState('');
    const [experience, setExperience] = useState('');
    const [cost, setCost] = useState('');

    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        },
    };

    const customStylesMentor = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '65%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        },
    };
    const name = 'harlen';
 // TODO QUE HAGA UN SUBMIT MODIFICANDO AL USUARIO  
    const submitForm = async (e) => {
        e.preventDefault();
        updateMentorStatus( name , 2, cost, experience);
        closeForm();
        alert('Formulario enviado');
    };

    const openForm = () => {
        setFormIsOpen(true);
    };
    const closeForm = () => {
        setFormIsOpen(false);
    };
    const openRequest = () => {
        setRequestIsOpen(true);
    };
    const closeRequest = () => {
        setRequestIsOpen(false);
    };


    const navigate = useNavigate();
    const isMentor = false; // TODO Replace with actual logic to determine if the user is a mentor

    useEffect(() => {
        if (isMentor) {
            navigate('/mentor');
        }
    }, [isMentor, navigate]);
    return (
        <div>
            <Header />
            <div className='mentorship-screen'>
                <div className="form-mentorship">
                    <h1>¿Creés tener la experiencia necesaria para convertirte en un mentor?</h1>
                    <p>Un mentor desempeña un papel fundamental en el desarrollo y éxito de nuevas iniciativas empresariales y sociales. Con tu experiencia en la creación y gestión, puedes ofrecer orientación estratégica y táctica a los fundadores y líderes de proyectos. Ayudan a identificar oportunidades de mercado y a desarrollar modelos de negocio sostenibles, al mismo tiempo que definen misiones y visiones claras para las organizaciones caritativas. Proporciona asesoramiento sobre la gestión de recursos, la recaudación de fondos y la creación de programas que generen un impacto social positivo. Su apoyo integral abarca tanto aspectos técnicos como emocionales, ayudando a los emprendedores y líderes de proyectos. </p>

                    <button onClick={openForm}>
                        <p>Llenar formulario</p>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                    <Modal 
                        isOpen={formIsOpen}
                        onRequestClose={closeForm}
                        contentLabel="Mentorship Form"
                        style={customStyles}
                    >
                        <h2>Formulario</h2>
                        <form className='form1' onSubmit={submitForm}>
                            
                            <div className="question">
                                <label>Porque quieres ser mentor:</label>
                                <textarea 
                                    name="experience" 
                                    value={reason}
                                    onChange={(e)=>{setReason(e.target.value)}}
                                    required    
                                ></textarea>
                            </div>
                            <div className="question">
                                <label>Experiencia:</label>
                                <textarea 
                                    name="experience"   
                                    value={experience}
                                    onChange={(e)=>{setExperience(e.target.value)}}
                                    required    
                                ></textarea>
                            </div>
                            <div className="question">
                                <label>Costo por mentoria:</label>
                                <input 
                                    type="number" 
                                    name="cost" 
                                    value={cost}
                                    onChange={(e)=>{setCost(e.target.value)}}
                                    required
                                />
                            </div>
                            <button type="submit" className='send-button'>Enviar</button>
                        </form>
                        <button onClick={closeRequest} className='close'>X</button>
                    </Modal>
                </div>
                <div className="request-mentorship">
                    <h1>¿Necesitas un guia para tus proyectos?</h1>
                    <p>Contratar un mentor puede ser una decisión transformadora para cualquier project manager que busque llevar sus proyectos al siguiente nivel. Un mentor aporta una riqueza de experiencia y conocimientos que pueden ayudar a evitar errores comunes y a superar obstáculos con mayor eficacia. Además, los mentores ofrecen una perspectiva externa valiosa, proporcionando ideas innovadoras y estrategias probadas que pueden optimizar la gestión de proyectos. Invertir en un mentor no solo mejora las habilidades y capacidades del project manager, sino que también aumenta significativamente las probabilidades de éxito del proyecto.</p>
                    
                    <button onClick={setRequestIsOpen}>
                        <p>Solicitar mentoria</p>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                    <Modal 
                        isOpen={requestIsOpen}
                        onRequestClose={openRequest}
                        contentLabel="Mentorship Form"
                        style={customStylesMentor}
                    >
                        <button onClick={closeRequest} className='close'>X</button>
                        <UserList getMentors={true}/>                        
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Mentorship;