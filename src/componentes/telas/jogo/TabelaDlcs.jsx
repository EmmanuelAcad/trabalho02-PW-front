import { useContext } from "react";
import JogoContext from "./JogoContext";
import Alerta from '../../comuns/Alerta'

function TabelaDlcs() {

    const { alerta, setAlerta, listaDlcs, removerDlc,
        objeto, setEditarDlc, setDlc, recuperarDlc,
        setExibirDlcs }
        = useContext(JogoContext);

    return (
        <div style={{ padding: '20px' }}>
            <button className="btn btn-secondary" onClick={() => {
                setExibirDlcs(false);
                setAlerta({ status: "", message: "" });
            }}>
               Voltar <i className="bi bi-backspace"></i>
            </button>
            <h1>Dlcs do jogo : {objeto.titulo}</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEdicaoDlc"
                onClick={() => {
                    setEditarDlc(false);
                    setAlerta({ status: "", message: "" });
                    setDlc({
                        codigo: 0,
                        titulo: "", descricao: "", preco: "",
                        jogo: objeto.codigo
                    });
                }}>
                Novo
            </button>
            {listaDlcs.length === 0 &&
                <h1>Nenhuma dlc encontrada</h1>}
            {listaDlcs.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Descricao</th>
                                <th scope="col">Preco</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaDlcs.map(dlc => (
                                <tr key={dlc.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicaoDlc"
                                            onClick={() => {
                                                recuperarDlc(dlc.codigo);
                                                setEditarDlc(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => removerDlc(dlc)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{dlc.codigo}</th>
                                    <td>{dlc.titulo}</td>
                                    <td>{dlc.descricao}</td>
                                    <td>{dlc.preco}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )

}

export default TabelaDlcs;