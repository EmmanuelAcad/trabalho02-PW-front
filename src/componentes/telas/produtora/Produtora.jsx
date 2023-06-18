import { useState, useEffect } from "react";
import ProdutoraContext from "./ProdutoraContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getProdutorasAPI, getProdutoraPorCodigoAPI, deleteProdutoraPorCodigoAPI, cadastraProdutorasAPI } from '../../servicos/ProdutoraServico';
import WithAuth from "../../seg/WithAuth";
import { useNavigate } from "react-router-dom";

function Produtora() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", sede: ""
    });
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {
        try {
            setObjeto(await getProdutoraPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraProdutorasAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaProdutoras();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaProdutoras = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getProdutorasAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteProdutoraPorCodigoAPI(objeto.codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
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
            recuperar, acaoCadastrar, handleChange
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </ProdutoraContext.Provider>
    )

}

export default WithAuth(Produtora);