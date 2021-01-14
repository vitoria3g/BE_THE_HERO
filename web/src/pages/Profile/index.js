import React, {useState, useEffect} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([]); //começa com um array vazio

    const ongID = localStorage.getItem('ongId'); //resgantendo o id da Ong salva no navegador
    const ongName = localStorage.getItem('ongName'); //resgantendo o nome da Ong salva no navegador
    
    useEffect(()=>{
        api.get('profile', {
                headers: {
                    Authorization: ongID,
                    
                }
            }).then(response => 
                                {
                                  setIncidents(response.data)
                                }
                    );

                },[ongID] //toda vez que o id da ong for mudado o useEffect recarrega
    );

    async function handleDeleteIncident(id, title)
    {
        try
        {
            if(window.confirm(`Deseja realmente excluir: ${title}?`)){
                await api.delete(`incidents/${id}`, {
                    headers: {
                        Authorization: ongID,
                    }
                });
    
                setIncidents(incidents.filter(incident => incident.id !== id)); //filtrando todos os casos do array que não forem o deletado
                                                                                //"atualizando a pag" sem atualizar
            }
            else{
                alert('Operação cancelada.');
            }
            
        }
        catch(err)
        {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        if(window.confirm(`Deseja sair?`)){
                
            localStorage.clear(); //limpar as variaveis
            history.push('/');
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>
            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button type="button" onClick={()=> handleLogout()}>
                <FiPower size={18} color="#E02041"/>
            </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
               {
                   incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button"  onClick={()=> handleDeleteIncident(incident.id,incident.title)}>
                            <FiTrash2 size={20} color="#aBaBb3"/>
                        </button>

                    </li>
                   )
                )
               }
            </ul>
        </div>

    );
}