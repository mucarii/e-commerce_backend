<h1>E-commerce de Produtos</h1>

<h1>Integrantes:</h1>

<b>
Murilo Luiz Calore Ritto - RA: 1997483

Carlos Renato Alves de Oliveira - RA: 1162934
</b>

E-commerce API com MongoDB

Este projeto é uma API simples para um sistema de e-commerce, utilizando MongoDB como banco de dados. A aplicação oferece operações básicas CRUD (Create, Read, Update, Delete) para as principais entidades de um e-commerce.
Funcionalidades Principais

    Gerenciamento de usuários

    Cadastro e consulta de produtos

    Categorização de produtos

    Avaliações de produtos

    Processamento de pedidos

Estrutura do Projeto
Modelos

    Usuario.js: Gerencia os dados dos usuários do sistema

        Cadastro com data de registro automática

        Informações de endereço e contato

    Produto.js: Manipula os produtos disponíveis no e-commerce

    Categoria.js: Organiza produtos em categorias e subcategorias

    Avaliacao.js: Permite que usuários avaliem produtos

    Pedido.js: Gerencia os pedidos dos clientes

        Registro automático da data do pedido

        Detalhes de produtos, quantidades e endereço de entrega

Banco de Dados

    banco.js: Configuração da conexão com o MongoDB

        Conexão local padrão (mongodb://localhost:27017)

        Gerenciamento de erros com registro em log

Testes

Arquivos de teste para cada modelo, demonstrando as operações básicas:

    testeUsuario.js

    testeAvaliacao.js

    testeCategoria.js

    testePedido.js
