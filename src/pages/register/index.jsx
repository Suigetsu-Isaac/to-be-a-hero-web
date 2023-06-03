import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css';
import logoImg from '../../assets-frontend/assets/logo.svg'
import Modal from '../../components/Modal';



export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [code,setCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleModalClick(){
        setIsModalOpen(true);
    }

    function handleCloseModal(){
        setIsModalOpen(false);
    }

    async function handleRegister(e){
        e.preventDefault();

        if (whatsapp.length <= 11 && whatsapp.length >=8){
            setWhatsapp( "+55" + whatsapp)
        }

        console.log({
            name,
            email,
            whatsapp,
            city,
            uf,
        }
        )

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }
        
       try{
        const response = await api.post('ongs', data);
        setCode(response.data.id)
        handleModalClick();

       }catch(err){
            alert("Erro no Cadastro tente novamente");
       }
    }

        
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu Cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value = {name}
                        onChange = { e => setName(e.target.value) }
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value = {email}
                        onChange = { e => setEmail(e.target.value) }
                    />

                    <input 
                        
                        placeholder="Whatsapp" 
                        value = {whatsapp}
                        onChange = { e => setWhatsapp(e.target.value) }
                    />

                    <div className="input-group">
                        
                        <input 
                            placeholder="Cidade"
                            value = {city}
                            onChange = { e => setCity(e.target.value) }
                        />
                        
                        <input 
                            placeholder="UF"
                            style={{ width: 80 }} 
                            value = {uf}
                            onChange = { e => setUf(e.target.value) }
                         />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                    {isModalOpen && <Modal onClose={handleCloseModal} idCode={code}/>}
                </form>


            </div>
        </div>
    );
}