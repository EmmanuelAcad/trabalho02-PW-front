import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import JogoContext from "./JogoContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaProdutoras } =
        useContext(JogoContext);

    return (
        <Dialogo id="modalEdicao" titulo="Jogo"
            acaoCadastrar={acaoCadastrar} idform="formulario">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtTitulo" label="Titulo"
                tipo="text" name="titulo"
                value={objeto.titulo}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={50}
                msgvalido="Titulo OK"
                msginvalido="Informe o titulo" />
                <CampoEntrada id="txtGenero" label="Genero"
                tipo="text" name="genero"
                value={objeto.genero}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={50}
                msgvalido="Genero OK"
                msginvalido="Informe o genero" />
                <CampoEntrada id="txtPreco" label="Preco"
                tipo="number" name="preco" value={objeto.preco}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Preco OK"
                msginvalido="Informe o preco" />
            <div class="mb-3">
                <label htmlFor="selectProdutora"
                    className="form-label">Produtora</label>
                <select className="form-control"
                    required
                    value={objeto.produtora}
                    name="produtora" onChange={handleChange}>
                    <option disabled="true" value="">
                        Selecione a produtora
                    </option>
                    {
                        listaProdutoras.map((produtora) => (
                            <option key={produtora.codigo} value={produtora.codigo}>
                                {produtora.nome}
                            </option>
                        ))
                    }
                </select>
                <div class="valid-feedback">
                    Produtora OK
                </div>
                <div class="invalid-feedback">
                    Informe a produtora
                </div>
            </div>
        </Dialogo>
    )

}

export default Form;