import {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets-frontend/assets/logo.svg'
import heroImg from '../../assets-frontend/assets/heroes.png'

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

   async function handleLogon(e){
      e.preventDefault()

      try{
       const response = await api.post('session', { id }) 

       localStorage.setItem('OngId',id);
       localStorage.setItem('OngName',response.data.name);

       history.push('/profile');
      }catch(err){
        alert('Falha no Login, tente novamente.')
      }
    }

    return (
    <div className="logon-conteiner">
       <section className="form">
         <img src={logoImg} alt="Be The Hero" srcSet=""/>

         <form onSubmit={handleLogon}>
            <h1>Faca seu Logon</h1>

            <input 
              placeholder="sua ID"
              value = {id}
              onChange = { e => setId(e.target.value) }
            />

            <button className="button" type="submit">Entrar</button>

            <Link className = "back-link" to="/register">
                <FiLogIn size={16} color="#E02041"/>
                Não tenho cadastro
            </Link>
         </form>

       </section>

       <img src={heroImg} alt="Heroes" srcSet=""/>
    </div>
    );
}
