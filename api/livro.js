/*
    BACKEND - API DE LIVRO

    const função = async (requisição, resposta) => {}
    implementação de metodos assincronos

    função salvar - 
        No body da requisição há um json, que é interceptado pelo bodyparse, gerando um objeto pessoa.

        Um if verifica se um id foi passado aos parametros da requisição e o atribui para o id de funcionario, para determinar que se trata de metodo PUT ou POST.

        Em um try as funções de validação são usadas para os dados recebidos através dos formulários. Caso haja algum problema nesse processo, o catch irá retornar 400 como resposta da requisição. 
        O erro 400 é associado a quem está fazendo a requisição (lado do client), no caso o usuário que não inseriu os dados corretamente.

        Se os dados recebidos passaram nos testes de validação do try, agora poderão ser manipulados de acordo com a natureza do método.

        A senha recebida é criptografada e salva como propriedade do objeto pessoa.
        A propriedade confirmarSenha é apagada, como seu uso era apenas para fins de validação, não será inserida no banco de dados.

        É feita uma varredura no banco de dados para atribuir ao objeto pessoaFromDB o primeiro objeto do banco cujo o ID corresponda ao ID do objeto pessoa (proveniente do formulário). 
        A expressão await (que só pode ser usada em funções assincronas) congela a execução da função até que a promisse seja entregue.

        Um if verifica o objeto pessoaFromDb para determinar se a requisição é um PUT ou POST e proceder com a operação correspondente no banco de dados. 
        Caso pessoaFromDB exista: trata-se de um put. A função entao chama o servidor express para realizar um update no banco de dados onde o ID do objeto no banco corresponder ao id do objeto pessoa. Se deu tudo certo ela retorna 204, que é uma confirmação de sucesso sem conteúdo. Caso dê algo errado no update, ele retorna o erro 500, nesse caso provavelmente é algum problema interno no servidor.
        Caso pessoaFromDB não exista: trata-se de um post. A função chama o express para realizar um insert no banco utilizando os dados do objeto pessoa.

    função visualizar - 
        Chama o servidor express e faz um select na tabela de pessoas retornando id nome e login. Se tudo der certo ele retorna o objeto json contendo todos objetos da tabela no banco.

    função visualizarPorId - 
        Mermingual a de visualizar, porem ela usa o id da url para filtrar a o select e retorna apenas um único objeto da tabela no banco.

    função excluir -

*/

const bcrypt = require('bcrypt-nodejs') 

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const salvar = async (req, res) => {
        const livro = { ...req.body }

        if (req.params.id) livro.id = req.params.id

        try {
            existsOrError(livro.titulo, 'Título não inserido.')
            existsOrError(livro.descricao, 'Descrição não inserida.')
            existsOrError(livro.proprietarioId, 'Dono não especificado.')  

            const proprietarioFromDB = await
                app.db('usuarios')
                    .where({ id: livro.proprietarioId })
                    .first()

            if (!livro.id) {
                existsOrError(proprietarioFromDB, 'esse usuário não existe.')
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (livro.id) {
            app.db('livros')
                .update(livro)
                .where({ id: livro.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('livros')
                .insert(livro)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const visualizar = (req, res) => {
        app.db('livros')
        .select('id', 'titulo', 'descricao', 'fotoUrl', 'proprietarioId')
        .then(livro => res.json(livro))
        .catch(err => res.status(500).send(err))
    }

    const visualizarPorId = (req, res) => {
        app.db('livros')
        .select('id', 'titulo', 'descricao', 'fotoUrl', 'proprietarioId')
        .where({ id: req.params.id })
        .first()
        .then(livro => res.json(livro))
        .catch(err => res.status(500).send(err))
    }

    const excluir = async (req, res) => {
        try {
            const rowsDeleted = await 
            app.db('livros')
                .where({ id: req.params.id })
                .del()
            
            existsOrError(req.params.id, 'Id do livro não informado.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { salvar, visualizar, visualizarPorId, excluir }
}