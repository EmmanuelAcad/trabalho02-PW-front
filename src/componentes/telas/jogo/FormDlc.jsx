import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import JogoContext from "./JogoContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function FormDlc() {

    const { dlc, handleChangeDlc,
        acaoCadastrarDlc, alerta } = useContext(JogoContext);

    return (
        <Dialogo id="modalEdicaoDlc" titulo="Dlc"
            acaoCadastrar={acaoCadastrarDlc}
            idform="formularioDlc">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={dlc.codigo}
                onchange={handleChangeDlc} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtTitulo" label="Titulo"
                tipo="text" name="titulo"
                value={dlc.titulo}
                onchange={handleChangeDlc} requerido={true}
                readonly={false} maxlength={50}
                msgvalido="Titulo OK"
                msginvalido="Informe o titulo" />
            <CampoEntrada id="txtDescricao" label="Descrição"
                tipo="text" name="descricao"
                value={dlc.descricao}
                onchange={handleChangeDlc} requerido={true}
                readonly={false} maxlength={50}
                msgvalido="Descrição OK"
                msginvalido="Informe a descrição" />
            <CampoEntrada id="txtPreco" label="Preco"
                tipo="number" name="preco" value={dlc.preco}
                onchange={handleChangeDlc} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Preco OK"
                msginvalido="Informe o preco" />           
        </Dialogo>
    )

}

export default FormDlc;