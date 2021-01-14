import React, {useState} from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory(); //serve para se fazer a navegação entre as paginas sem usar o Link

   async function handleRegister(event){
        event.preventDefault();
        
        const data = {
                        name,
                        email, 
                        whatsapp, 
                        city, 
                        uf
                    };
        try
        {
            var response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/'); //enviando o usuário para a pag de login
        }
        catch(err) 
        {
            alert(`Erro no cadastro, tente novamente.`);
        }
    }



    return (
       <div className="register-container">
           <div className="content"> 
                <section>
                    <img src={logoImg} alt="Be the Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua Ong.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar a tela de login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>

                    <input  placeholder="Nome da ONG"
                            value={name}
                            onChange={e => setName(e.target.value)}
                    />

                    <input type="email" 
                           placeholder="E-mail"
                           value={email}
                           onChange={e => setEmail(e.target.value)} //ouvindo as mudanças que acontecem no input
                     />

                    <input  placeholder="WhatsApp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input  placeholder="Cidade"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                        />
                        <input  placeholder="UF" 
                                value={uf}
                                onChange={e => setUF(e.target.value)}
                                style={{width: 80}}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
           </div>
       </div>
    );
}