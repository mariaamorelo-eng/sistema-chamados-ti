# SISTEMA DE CHAMADOS DE SUPORTE T.I.
### API RESTful & Automação de Testes em Terminal

**Integrantes:** Maria Eduarda Morelo e Felipe Pereira Limeira de Souza  
**Curso:** Programação Back-End 1 (PBE1) — SENAI / Binário Tech  
**Tema:** Tema 5 — Sistema de Chamados de Suporte T.I.  
**Ambiente:** Linux Debian / Google Cloud Shell  
**URL Base:** `http://localhost:1025/api/v1`

---

## 1. Sobre o Projeto

API RESTful desenvolvida em **Node.js** e **Express** para gerenciamento de chamados de suporte técnico de T.I. O sistema permite cadastrar técnicos responsáveis e gerenciar chamados (abertura, consulta com filtros, atualização total/parcial de status e remoção), seguindo o padrão arquitetural **MVC** e validação de status HTTP.

---

## 2. Tecnologias Utilizadas

* **Node.js** (Ambiente de execução JavaScript)
* **Express** (Framework web para rotas e middlewares)
* **cURL + jq** (Automação de testes e formatação JSON via terminal Linux)
* **Git / GitHub** (Versionamento de código com Conventional Commits)

---

## 3. Estrutura do Projeto

text
├── src/
│   ├── controllers/     # Regras de negócio e respostas HTTP (200, 201, 400, 404)
│   ├── models/          # Armazenamento em memória e estrutura dos dados
│   └── routes/          # Definição dos endpoints (/tecnicos e /chamados)
├── server.js            # Arquivo principal de inicialização na porta 1025
├── package.json         # Dependências e scripts do projeto
└── README.md            # Documentação e guia de testes
4. Instalação e Controle do Servidor (Linux)Bash# Instalar as dependências do projeto
npm install

# Iniciar o servidor em segundo plano (background)
node server.js &

# Verificar o ID do processo (PID) do servidor
ps aux | grep "server.js"

# Encerrar o servidor
kill -9 2. Módulo: Técnicos (/api/v1/tecnicos) 2.1 Cadastrar Técnicos — POST /api/v1/tecnicos (201 Created) Bash
Cadastrar Técnico 1
curl -s -X POST http://localhost:1025/api/v1/tecnicos -H "Content-Type: application/json" -d '{"nome": "Maria Eduarda Morelo", "especialidade": "Redes"}' | jq .
Cadastrar Técnico 2
curl -s -X POST http://localhost:1025/api/v1/tecnicos -H "Content-Type: application/json" -d '{"nome": "Felipe Souza", "especialidade": "Hardware"}' | jq . 2.2 Consultar e Filtrar Técnicos — GET /api/v1/tecnicos (200 OK) Bash
Listar todos os técnicos (GET /api/v1/tecnicos)
curl -s http://localhost:1025/api/v1/tecnicos | jq .
Filtrar por especialidade (GET /api/v1/tecnicos?especialidade=Redes)
curl -s "http://localhost:1025/api/v1/tecnicos?especialidade=Redes" | jq .
Buscar técnico por ID (GET /api/v1/tecnicos/1)
curl -s http://localhost:1025/api/v1/tecnicos/1 | jq . 2.3 Atualizar Técnicos — PUT e PATCH (200 OK) Bash
Atualização completa (PUT /api/v1/tecnicos/2)
curl -s -X PUT http://localhost:1025/api/v1/tecnicos/2 -H "Content-Type: application/json" -d '{"nome": "Felipe Pereira Souza", "especialidade": "Infraestrutura"}' | jq .
Atualização parcial da especialidade (PATCH /api/v1/tecnicos/1/especialidade)
curl -s -X PATCH http://localhost:1025/api/v1/tecnicos/1/especialidade -H "Content-Type: application/json" -d '{"especialidade": "Seguranca da Informacao"}' | jq . 3. Módulo: Chamados (/api/v1/chamados) 3.1 Abrir Chamados — POST /api/v1/chamados (201 Created) Bash
Abrir Chamado 1 vinculado ao Técnico 1
curl -s -X POST http://localhost:1025/api/v1/chamados -H "Content-Type: application/json" -d '{"titulo": "Queda de rede no setor B", "descricao": "Switch sem conectividade", "tecnicoId": 1}' | jq .
Abrir Chamado 2 vinculado ao Técnico 2
curl -s -X POST http://localhost:1025/api/v1/chamados -H "Content-Type: application/json" -d '{"titulo": "Troca de SSD", "descricao": "Estacao de trabalho lenta", "tecnicoId": 2}' | jq . 3.2 Consultar e Filtrar Chamados — GET /api/v1/chamados (200 OK) Bash
Listar todos os chamados (GET /api/v1/chamados)
curl -s http://localhost:1025/api/v1/chamados | jq .
Filtrar por status (GET /api/v1/chamados?status=ABERTO)
curl -s "http://localhost:1025/api/v1/chamados?status=ABERTO" | jq .
Filtrar por técnico responsável (GET /api/v1/chamados?tecnicoId=1)
curl -s "http://localhost:1025/api/v1/chamados?tecnicoId=1" | jq .
Buscar chamado por ID (GET /api/v1/chamados/1)
curl -s http://localhost:1025/api/v1/chamados/1 | jq . 3.3 Atualizar Chamados — PUT e PATCH (200 OK) Bash
Atualização completa do chamado (PUT /api/v1/chamados/2)
curl -s -X PUT http://localhost:1025/api/v1/chamados/2 -H "Content-Type: application/json" -d '{"titulo": "Troca de SSD NVMe", "descricao": "Instalacao de SSD 1TB concluida", "status": "EM_ANDAMENTO", "tecnicoId": 2}' | jq .
Atualização parcial de status (PATCH /api/v1/chamados/1/status)
curl -s -X PATCH http://localhost:1025/api/v1/chamados/1/status -H "Content-Type: application/json" -d '{"status": "CONCLUIDO"}' | jq . 4. Testes de Validação e Erros (400 e 404) 4.1 Erros de Validação — 400 Bad Request Bash
Campo obrigatório ausente (POST /api/v1/tecnicos)
curl -i -s -X POST http://localhost:1025/api/v1/tecnicos -H "Content-Type: application/json" -d '{"nome": "Tecnico Incompleto"}'
Chamado vinculado a tecnicoId inexistente (POST /api/v1/chamados)
curl -i -s -X POST http://localhost:1025/api/v1/chamados -H "Content-Type: application/json" -d '{"titulo": "Erro", "descricao": "Teste de validacao", "tecnicoId": 999}' 4.2 Recursos Inexistentes — 404 Not Found Bash
Técnico inexistente (GET /api/v1/tecnicos/999)
curl -i -s http://localhost:1025/api/v1/tecnicos/999
Chamado inexistente (GET /api/v1/chamados/999)
curl -i -s http://localhost:1025/api/v1/chamados/999 5. Remoção de Registros — DELETE (200 OK) Bash
Remover Chamado 2 (DELETE /api/v1/chamados/2)
curl -s -X DELETE http://localhost:1025/api/v1/chamados/2 | jq .
Remover Técnico 2 (DELETE /api/v1/tecnicos/2)
curl -s -X DELETE http://localhost:1025/api/v1/tecnicos/2 | jq .
