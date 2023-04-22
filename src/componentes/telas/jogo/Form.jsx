import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import JogoContext from "./JogoContext";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } =
        useContext(JogoContext);

    (() => {
        //'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <div className="modal fade" id="modalEdicao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Jogo</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div class="mb-3">
                                <label htmlFor="txtCodigo"
                                    className="form-label">Código</label>
                                <input className="form-control"
                                    type="number"
                                    id="txtCodigo"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                    readOnly />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="txtTitulo"
                                    className="form-label">Titulo</label>
                                <input className="form-control"
                                    type="text"
                                    id="txtTitulo"
                                    name="titulo"
                                    value={objeto.titulo}
                                    onChange={handleChange}
                                    required />
                                <div class="valid-feedback">
                                    Título OK
                                </div>
                                <div class="invalid-feedback">
                                    O título deve ser informado
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="txtGenero"
                                    className="form-label">Gênero</label>
                                <input className="form-control"
                                    type="text"
                                    id="txtGenero"
                                    name="genero"
                                    value={objeto.genero}
                                    onChange={handleChange}
                                    required />
                                <div class="valid-feedback">
                                    Gênero OK
                                </div>
                                <div class="invalid-feedback">
                                    O gênero deve ser informada
                                </div>                                    
                            </div>
                            <div class="mb-3">
                                <label htmlFor="txtPreco"
                                    className="form-label">Preço</label>
                                <input className="form-control"
                                    type="number"
                                    id="txtPreco"
                                    name="preco"
                                    value={objeto.preco}
                                    onChange={handleChange}
                                    required />
                                <div class="valid-feedback">
                                    Preço OK
                                </div>
                                <div class="invalid-feedback">
                                    O preço deve ser informado
                                </div>                                    
                            </div>
                            <div class="mb-3">
                                <label htmlFor="txtProdutora"
                                    className="form-label">Produtora</label>
                                <input className="form-control"
                                    type="number"
                                    id="txtProdutora"
                                    name="produtora"
                                    value={objeto.produtora}
                                    onChange={handleChange}
                                    required />
                                <div class="valid-feedback">
                                    Produtora OK
                                </div>
                                <div class="invalid-feedback">
                                    A produtora deve ser informada
                                </div>                                    
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Form;