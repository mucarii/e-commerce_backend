# E-commerce de Produtos

**Integrantes:**  
- Murilo Luiz Calore Ritto — RA: 1997483  
- Carlos Renato Alves de Oliveira — RA: 1162934  

---

## Sobre o Projeto

Este repositório contém uma **API de E-commerce** simples, utilizando **Node.js** e **MongoDB**.  
O sistema oferece operações básicas de CRUD (“Create”, “Read”, “Update”, “Delete”) para as principais entidades de um e-commerce, tais como usuários, produtos, categorias, avaliações e pedidos.

---

## Funcionalidades Principais

- **Gerenciamento de Usuários**  
  - Cadastro de novos usuários com data de registro automática  
  - Atualização, listagem e remoção de usuários  

- **Cadastro e Consulta de Produtos**  
  - Inserção de novos produtos (nome, descrição, preço, estoque, etc.)  
  - Consulta de todos os produtos ou por filtro específico  
  - Atualização e exclusão de um produto  

- **Categorização de Produtos**  
  - Criação de categorias e subcategorias para organizar o catálogo  
  - Associação de produtos às respectivas categorias  

- **Avaliações de Produtos**  
  - Permite que usuários avaliem itens (nota e comentário)  
  - Listagem de avaliações por produto  

- **Processamento de Pedidos**  
  - Criação de pedidos, vinculando usuário, produtos, quantidades e endereço de entrega  
  - Cálculo automático do valor total  
  - Listagem, atualização de status e exclusão de pedidos  

---

## Estrutura do Projeto

e-commerce-backend/
├── src/
│   ├── db.js
│   ├── logger.js
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Produto.js
│   │   ├── Categoria.js
│   │   ├── Avaliacao.js
│   │   └── Pedido.js
│   └── scripts/
│       ├── inserirUsuarios.js
│       ├── inserirProdutos.js
│       ├── inserirPedido.js
│       ├── listarUsuarios.js
│       ├── listarProdutos.js
│       └── listarPedidos.js
├── logs/
│   └── app.log
├── package.json
└── README.md


---

## Modelos (src/models)

1. **Usuario.js**  
   - Gerencia os dados dos usuários do sistema  
   - Campos principais: `nome`, `data_registro`, `endereço`, `contato` (se aplicável)  
   - Métodos: `inserir()`, `listar()`, `buscarPorId()`, `atualizarPorId()`, `removerPorId()`

2. **Produto.js**  
   - Manipula os produtos disponíveis no e-commerce  
   - Campos principais: `nome`, `descrição`, `preço`, `estoque`, `data_criacao`  
   - Métodos: `inserir()`, `listar()`, `buscarPorId()`, `atualizarPorId()`, `removerPorId()`

3. **Categoria.js**  
   - Organiza produtos em categorias e subcategorias  
   - Campos: `nome`, `descricao`, `pai` (para subcategoria)  
   - Métodos: `inserir()`, `listar()`, `buscarPorId()`, `atualizarPorId()`, `removerPorId()`

4. **Avaliacao.js**  
   - Permite que usuários avaliem produtos  
   - Campos: `usuario_id`, `produto_id`, `nota`, `comentario`, `data_avaliacao`  
   - Métodos: `inserir()`, `listarPorProduto()`, `removerPorId()`

5. **Pedido.js**  
   - Gerencia os pedidos dos clientes  
   - Campos: `usuario_id`, `produtos` (array com `produto_id`, `quantidade`, `preco_unitario`), `endereco_entrega`, `forma_pagamento`, `status`, `valor_total`, `data_pedido`  
   - Métodos: `inserir()`, `listar()`, `buscarPorId()`, `atualizarStatus()`, `removerPorId()`

---

## Banco de Dados (src/db.js)

- Conexão padrão com MongoDB em:  
    
    mongodb://localhost:27017/ecommerce_db

- Exporta três funções principais:  
- `connect()` — abre a conexão (se ainda não estiver aberta)  
- `getDb()` — retorna a instância do banco já conectada  
- `close()` — fecha a conexão  

---

## Logging (src/logger.js)

- Registra eventos no console e em arquivo (`logs/app.log`)  
- Níveis suportados: `info`, `warn`, `error`  
- Cada mensagem é prefixada com timestamp ISO e nível de log  
- Estrutura resumida:
```js
const fs = require('fs');
const { Console } = require('console');


### Scripts de Teste (src/scripts)

- **inserirUsuarios.js**  
  Insere dois usuários pré-definidos e encerra.

- **inserirProdutos.js**  
  Insere dois produtos pré-definidos e encerra.

- **inserirPedido.js**  
  Aceita argumentos pela linha de comando:

node inserirPedido.js <usuarioId> <prod1Id> <qtd1> <preco1> [<prod2Id> <qtd2> <preco2> …]

Cria um pedido com os parâmetros informados e encerra.

- **listarUsuarios.js**  
Lista todos os usuários cadastrados.

- **listarProdutos.js**  
Lista todos os produtos cadastrados.

- **listarPedidos.js**  
Lista todos os pedidos, exibindo `_id`, `usuario_id`, `valor_total`, `status` e `data_pedido`.

## Como Rodar

1. **Clone este repositório**  
   ```bash
   git clone https://github.com/seu-usuario/e-commerce-backend.git
   cd e-commerce-backend

2. **Instale as Dependências**  
   ```bash
   npm install mongodb

3. **Execute os Scripts de Teste**  
   ```bash
   node src/scripts/inserirUsuarios.js
   node src/scripts/inserirProdutos.js
   node src/scripts/inserirPedido.js
   node src/scripts/listarUsuarios.js
   node src/scripts/listarProdutos.js
   node src/scripts/listarPedidos.js

4. **Verifique o arquivo de log logs/app.log**
    Todas as chamadas a logger.info(), logger.warn() e logger.error() serão gravadas lá, preservando o histórico de execuções.