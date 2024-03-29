/*
    BACKEND - ROTAS com REST

    modelo:
    app.route(endereço).metodoDeRequisição(funçãoUtilizada)

    respostas:
    1XX – Informações Gerais
    2XX – Sucesso
    3XX – Redirecionamento
    4XX – Erro no cliente
    5XX – Erro no servidor
    
    .all() é um filtro que chama o metodo autenticate do arquivo passport para validar a sessão e a partir disso permitir ou negar o acesso aos serviços/rotas especificas da aplicação.

    .post() vai associar qual metodo será chamado quando ele receber uma requisição nessa rota usando post. Assim também é com .get(), .put() e .delete()

    o método .save serve tanto para inserir/POST quanto para alterar/PUT um usuário, por isso a diferença entre o POST e o PUT está no parâmetro fornecido na url (no caso o :id ou a ausencia dele), é assim que o método descobre qual tipo de requisição está sendo feita.

    O consign (instanciado lá no index.js) usa o caminho app.api.cliente.save para chamar a instancia, acessar a api, entrar no arquivo cliente e pegar a função save retornada pelo modulo. Um exemplo da mesma configuração, sem usar o consign:

        const cliente = require('../api.cliente')
        module.exports = app => {app.route('/clientes').post(cliente.save)}
        
*/

module.exports = app => {
    const path = require('path')
    const { upload } = app.api.upload

    // publicas ocultas, disponiveis para qualquer usuário, mas não inclusas nas rotas do frontend
    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.usuario.salvar)
    app.post('/validateToken', app.api.auth.validarToken)
    app.get('/livros', app.api.livro.visualizar)
    app.get('/buscar-livros/:nome', app.api.livro.visualizarPorNome)
    app.get('/livros/:id', app.api.livro.visualizarPorId)

    // ROTAS PROTEGIDAS
    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .get(app.api.usuario.visualizar)

    app.route('/usuarios/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.usuario.salvar)
        .get(app.api.usuario.visualizarPorId)
        .delete(app.api.usuario.excluir)
    
    app.route('/usuarios/vinculados/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.usuario.visualizarVinculados)

    app.route('/livros')
        .all(app.config.passport.authenticate())
        .post(app.api.livro.salvar)

    app.route('/livros/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.livro.salvar)
        // .get(app.api.livro.visualizarPorId)  
        .delete(app.api.livro.excluir)

    app.route('/categorias')
        .all(app.config.passport.authenticate())
        .post(app.api.categoria.salvar)
        .get(app.api.categoria.visualizar)

    app.route('/categorias/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.categoria.salvar)
        .get(app.api.categoria.visualizarPorId)
        .delete(app.api.categoria.excluir)

    app.route('/categorias/vinculados/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.categoria.visualizarVinculados)

    app.route('/curtidas')
        .post(app.api.curtidas.salvar)
        .get(app.api.curtidas.visualizar)

    app.route('/descurtir')
        .delete(app.api.curtidas.excluir)

    app.route('/matches/:id')
        .delete(app.api.curtidas.deleteMatch)


    // rota de upload
    app.post('/upload-livroImg', (req, res) => {
        upload(req,res,function(err){

            if(err === "INCORRECT_FILETYPE") { 
                // console.log(err)
                res.status(422).json({ erro: "Apenas imagens são aceitas."})
            }
            if (err === "LIMIT_FILE_SIZE") {
                // console.log(err.code)
                res.status(422).json({ erro: "Arquivo muito grande"})
            } 
            else { 
                res.json({ file: req.file })
            }
        });
        
    }); 

    app.post('/upload-profileImg', (req, res) => {
        upload(req,res,function(err){

            if(err === "INCORRECT_FILETYPE") { 
                // console.log(err)
                res.status(422).json({ erro: "Apenas imagens são aceitas."})
            }
            if (err === "LIMIT_FILE_SIZE") {
                // console.log(err.code)
                res.status(422).json({ erro: "Arquivo muito grande"})
            } 
            else { 
                res.json({ file: req.file })
            }
        });
        
    }); 
}