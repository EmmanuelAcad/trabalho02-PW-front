import { useState, useEffect } from "react";
import ProdutoraContext from "./ProdutoraContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Produtora() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", sede: ""
    });

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtoras/${codigo}`)
            .then(response => response.json())
            .then(json => setObjeto(json))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtoras`,
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
        recuperaProdutoras();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaProdutoras = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtoras`)
            .then(response => response.json())
            .then(json => setListaObjetos(json))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {

            await
                fetch(`${process.env.REACT_APP_ENDERECO_API}/produtoras/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({
                        status: json.status,
                        message: json.message
                    }))
                    .catch(err => setAlerta({ status: "error", message: err }))

        }
        recuperaProdutoras();
    }

    useEffect(() => {
        recuperaProdutoras();
    }, []);

    return (
        <ProdutoraContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaProdutoras, remover,
            objeto, setObjeto, 
            editar, setEditar, 
            recuperar, acaoCadastrar,  handleChange
        }}>
            <Tabela />
            <Form/>
        </ProdutoraContext.Provider>
    )

}

export default Produtora;