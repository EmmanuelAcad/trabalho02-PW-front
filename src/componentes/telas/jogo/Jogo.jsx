import { useState, useEffect } from "react";
import JogoContext from "./JogoContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getProdutorasAPI } from '../../servicos/ProdutoraServico';
import { getJogosAPI, getJogoPorCodigoAPI, deleteJogoPorCodigoAPI, cadastraJogosAPI } from '../../servicos/JogoServico'
import {
    getDlcsPorJogoAPI, getDlcPorCodigoAPI,
    deleteDlcPorCodigoAPI, cadastraDlcsAPI
} from '../../servicos/DlcServico';
import FormDlc from "./FormDlc";
import TabelaDlc from "./TabelaDlcs";
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
    const [listaProdutoras, setListaProdutoras] = useState([]);
    const [editarDlc, setEditarDlc] = useState(false);
    const [dlc, setDlc] = useState({
        codigo: "", titulo: "", descricao: "", preco: "", jogo: ""
    })
    const [listaDlcs, setListaDlcs] = useState([]);
    const [exibirDlcs, setExibirDlcs] = useState(false);

    const recuperarDlcs = async codigojogo => {
        try {
            setObjeto(await getJogoPorCodigoAPI(codigojogo));
            setListaDlcs(await getDlcsPorJogoAPI(codigojogo));
            setExibirDlcs(true);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperarDlc = async codigo => {
        try {
            setDlc(await getDlcPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const removerDlc = async dlc => {
        if (window.confirm('Deseja remover esta dlc?')) {
            let retornoAPI =
                await deleteDlcPorCodigoAPI(dlc.codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setListaDlcs(await getDlcsPorJogoAPI(objeto.codigo));
        }
    }

    const acaoCadastrarDlc = async e => {
        e.preventDefault();
        const metodo = editarDlc ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraDlcsAPI(dlc, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editarDlc) {
                setEditarDlc(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperarDlcs(objeto.codigo);
    }

    const handleChangeDlc = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDlc({ ...dlc, [name]: value });
    }

    const recuperar = async codigo => {
        try {
            setObjeto(await getJogoPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraJogosAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaJogos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaJogos = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getJogosAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaProdutoras = async () => {
        setListaProdutoras(await getProdutorasAPI());
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteJogoPorCodigoAPI(objeto.codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                console.log(err);
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaJogos();
    }

    useEffect(() => {
        recuperaJogos();
        recuperaProdutoras();
    }, []);

    return (
        <JogoContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaProdutoras, remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar, acaoCadastrar, handleChange, listaProdutoras,
            listaDlcs, dlc, setDlc, handleChangeDlc,
            removerDlc, recuperarDlc, acaoCadastrarDlc,
            setEditarDlc, editarDlc, recuperarDlcs,
            setExibirDlcs
        }}>
            <Carregando carregando={carregando}>
                {!exibirDlcs ? <Tabela /> : <TabelaDlc />}
            </Carregando>
            <Form />
            <FormDlc />
        </JogoContext.Provider>
    )

}

export default WithAuth(Produtora);