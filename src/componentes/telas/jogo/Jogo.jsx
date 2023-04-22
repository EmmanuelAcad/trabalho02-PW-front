import { useState, useEffect } from "react";
import JogoContext from "./JogoContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Jogo() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", titulo: "", genero: "", preco: "", produtora: ""
    });

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogos/${codigo}`)
            .then(response => response.json())
            .then(json => setObjeto(json))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogos`,
            {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(objeto)
            }).then(response => response.json())
            .then(json => {
                setAlerta({ status: json.status, message: json.message });
                setObjeto(json.objeto);
                if (!editar) {
                    setEditar(true);
                }
            })
        recuperaJogos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaJogos = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogos`)
            .then(response => response.json())
            .then(json => setListaObjetos(json))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {

            await
                fetch(`${process.env.REACT_APP_ENDERECO_API}/jogos/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({
                        status: json.status,
                        message: json.message
                    }))
                    .catch(err => setAlerta({ status: "error", message: err }))

        }
        recuperaJogos();
    }

    useEffect(() => {
        recuperaJogos();
    }, []);

    return (
        <JogoContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaJogos, remover,
            objeto, setObjeto, 
            editar, setEditar, 
            recuperar, acaoCadastrar,  handleChange
        }}>
            <Tabela />
            <Form/>
        </JogoContext.Provider>
    )

}

export default Jogo;