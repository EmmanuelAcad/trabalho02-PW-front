import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import ProdutoraContext from "./ProdutoraContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } =
        useContext(ProdutoraContext);

    return (
        <Dialogo id="modalEdicao" titulo="Produtora"
            acaoCadastrar={acaoCadastrar} idform="formulario">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtNome" label="Nome"
                tipo="text" name="nome" value={objeto.nome}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={50}
                msgvalido="Nome OK"
                msginvalido="Informe o nome" />
            <CampoEntrada id="txtSede" label="Sede"
                tipo="text" name="sede"
                value={objeto.sede}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={50}
                msgvalido="Sede OK"
                msginvalido="Informe a sede" />
        </Dialogo>
    )

}

export default Form;