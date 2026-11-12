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
kill -9 <PID>
5. Mapa de Endpoints e Status HTTPMétodoRotaDescriçãoStatus HTTPPOST/api/v1/tecnicosCadastrar novo técnico201 / 400GET/api/v1/tecnicosListar técnicos (aceita ?especialidade=)200GET/api/v1/tecnicos/:idBuscar técnico por ID200 / 404PUT/api/v1/tecnicos/:idAtualização completa do técnico200 / 400 / 404PATCH/api/v1/tecnicos/:id/especialidadeAtualização parcial da especialidade200 / 400 / 404DELETE/api/v1/tecnicos/:idRemover técnico por ID200 / 404POST/api/v1/chamadosAbrir novo chamado201 / 400GET/api/v1/chamadosListar chamados (?status= / ?tecnicoId=)200GET/api/v1/chamados/:idBuscar chamado por ID200 / 404PUT/api/v1/chamados/:idAtualização completa do chamado200 / 400 / 404PATCH/api/v1/chamados/:id/statusAtualização parcial do status do chamado200 / 400 / 404DELETE/api/v1/chamados/:idRemover chamado por ID200 / 4046. Testes Automatizados via cURL (Por Status HTTP)6.1 Status 201 — Cadastrar Técnicos e Abrir Chamados (POST)Cadastrar Técnicos (POST /api/v1/tecnicos) — Status 201Bash# Cadastrar Técnico 1
curl -s -X POST http://localhost:1025/api/v1/tecnicos -H "Content-Type: application/json" -d '{"nome": "Maria Eduarda Morelo", "especialidade": "Redes"}' | jq .

# Cadastrar Técnico 2
curl -s -X POST http://localhost:1025/api/v1/tecnicos -H "Content-Type: application/json" -d '{"nome": "Felipe Souza", "especialidade": "Hardware"}' | jq .
Abrir Chamados (POST /api/v1/chamados) — Status 201Bash# Abrir Chamado 1 (vinculado ao Técnico 1)
curl -s -X POST http://localhost:1025/api/v1/chamados -H "Content-Type: application/json" -d '{"titulo": "Queda de rede no setor B", "descricao": "Switch sem conectividade", "tecnicoId": 1}' | jq .

# Abrir Chamado 2 (vinculado ao Técnico 2)
curl -s -X POST http://localhost:1025/api/v1/chamados -H "Content-Type: application/json" -d '{"titulo": "Troca de SSD", "descricao": "Estacao de trabalho lenta", "tecnicoId": 2}' | jq .
6.2 Status 200 — Consultar, Editar e Deletar (GET, PUT, PATCH, DELETE)Consultar Técnicos (GET /api/v1/tecnicos) — Status 200Bash# Listar todos os técnicos
curl -s http://localhost:1025/api/v1/tecnicos | jq .

# Filtrar por especialidade
curl -s "http://localhost:1025/api/v1/tecnicos?especialidade=Redes" | jq .

# Buscar técnico por ID
curl -s http://localhost:1025/api/v1/tecnicos/1 | jq .
Consultar Chamados (GET /api/v1/chamados) — Status 200Bash# Listar todos os chamados
curl -s http://localhost:1025/api/v1/chamados | jq .

# Filtrar por status
curl -s "http://localhost:1025/api/v1/chamados?status=ABERTO" | jq .

# Filtrar por técnico responsável
curl -s "http://localhost:1025/api/v1/chamados?tecnicoId=1" | jq .

# Buscar chamado por ID
curl -s http://localhost:1025/api/v1/chamados/1 | jq .
Atualizar Técnicos (PUT e PATCH /api/v1/tecnicos) — Status 200Bash# Atualização completa (PUT)
curl -s -X PUT http://localhost:1025/api/v1/tecnicos/2 -H "Content-Type: application/json" -d '{"nome": "Felipe Pereira Souza", "especialidade": "Infraestrutura"}' | jq .

# Atualização parcial da especialidade (PATCH)
curl -s -X PATCH http://localhost:1025/api/v1/tecnicos/1/especialidade -H "Content-Type: application/json" -d '{"especialidade": "Seguranca da Informacao"}' | jq .
Atualizar Chamados (PUT e PATCH /api/v1/chamados) — Status 200Bash# Atualização completa do chamado (PUT)
curl -s -X PUT http://localhost:1025/api/v1/chamados/2 -H "Content-Type: application/json" -d '{"titulo": "Troca de SSD NVMe", "descricao": "Instalacao de SSD 1TB concluida", "status": "EM_ANDAMENTO", "tecnicoId": 2}' | jq .

# Atualização parcial de status (PATCH)
curl -s -X PATCH http://localhost:1025/api/v1/chamados/1/status -H "Content-Type: application/json" -d '{"status": "CONCLUIDO"}' | jq .
Remover Registros (DELETE) — Status 200Bash# Remover Chamado 2
curl -s -X DELETE http://localhost:1025/api/v1/chamados/2 | jq .

# Remover Técnico 2
curl -s -X DELETE http://localhost:1025/api/v1/tecnicos/2 | jq .
6.3 Status 400 — Erros de Validação (Bad Request)Bash# Status 400: Campo obrigatório ausente (POST /api/v1/tecnicos)
curl -i -s -X POST http://localhost:1025/api/v1/tecnicos -H "Content-Type: application/json" -d '{"nome": "Tecnico Incompleto"}'

# Status 400: Chamado vinculado a tecnicoId inexistente (POST /api/v1/chamados)
curl -i -s -X POST http://localhost:1025/api/v1/chamados -H "Content-Type: application/json" -d '{"titulo": "Erro", "descricao": "Teste de validacao", "tecnicoId": 999}'
6.4 Status 404 — Recursos Inexistentes (Not Found)Bash# Status 404: Técnico inexistente (GET /api/v1/tecnicos/999)
curl -i -s http://localhost:1025/api/v1/tecnicos/999

# Status 404: Chamado inexistente (GET /api/v1/chamados/999)
curl -i -s http://localhost:1025/api/v1/chamados/999
