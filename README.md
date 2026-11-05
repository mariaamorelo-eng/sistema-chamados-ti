   ___ ___ ___ _____ _____ __  __   _      ___ _  _   _   __  __   _ ___  ___  ___  
 / __|_ _| __|_   _| ___|  \/  | /_\    | _ \ || | /_\ |  \/  | / |   \/ _ \/ __| 
 \__ \| || _|  | | | _| | |\/| |/ _ \   |  _/ __ |/ _ \| |\/| | | | |) | (_) \__ \ 
 |___/___|___| |_| |___|_|  |_/_/ \_\  |_| |_||_/_/ \_\_|  |_| |_|_|___/\___/|___/ 

# SISTEMA DE CHAMADOS DE SUPORTE T.I.

### *API RESTful & Automação em Shell Scripting*
---
> ## INTEGRANTES DO GRUPO:
> **Maria Eduarda Morelo**
> **Felipe Pereira Limeira de Souza**
> **Curso:** Programação Back-End 1 (PBE1)
> **Instituição:** SENAI / Binário Tech
> **Tema Escolhido:** Tema 5 — Sistema de Chamados de Suporte T.I.
> **Ambiente de Desenvolvimento:** Linux Debian / Google Cloud Shell
---
# SUMÁRIO:
# 1. API RESTful (`server.js`)
**Prefixos Globais:** Todas as rotas devem responder obrigatoriamente sob o prefixo `/api/v1/`.
**CRUD Completo em 2 Entidades Relacionadas (`Tecnicos` e `Chamados`):**
  - `GET` — Listagem geral e consulta individual por ID.

  - `POST` — Criação de novos registros.

  - `PUT` — Substituição completa de registros existentes.

  - `PATCH` — Atualização parcial de campos específicos (ex: `especialidade` ou `status`).

  - `DELETE` — Remoção de registros por ID.

**Validação Relacional de Regra de Negócio:** Proteção contra abertura ou edição de chamados vinculados a um `tecnicoId` inexistente.
**Query Parameters:** Suporte obrigatório a filtros na listagem `GET` (ex: `?especialidade=Redes` e `?status=ABERTO`).
---
# 2. Padrões de Resposta & Status HTTP
**`200 OK`:** Retornado em consultas (`GET`), edições totais/parciais (`PUT`/`PATCH`) e deleções (`DELETE`) bem-sucedidas.
**`201 Created`:** Retornado na criação bem-sucedida de registros via `POST`.
**`400 Bad Request`:** Retornado em falhas de validação de payload (campos obrigatórios ausentes ou referência a ID inválido).
**`404 Not Found`:** Retornado quando a busca ou manipulação refere-se a um ID inexistente no banco de dados em memória.
---
# 3. Automação Shell Scripting (`testes_automacao.sh`)
**Cobertura Total de Rotas:** Script em Bash executando chamadas HTTP via `curl` para os 12 cenários de teste da API.
**Formatação de Resposta:** Manipulação e exibição formatada dos retornos JSON utilizando a ferramenta `jq`.
**Geração de Log de Auditoria:** Redirecionamento e salvamento da saída limpa da suíte de testes no arquivo `resultado_execucao.log`.
---
# 4. Ambiente Linux Debian & Gestão de Processos
**Configuração de Dependências:** Arquivo `package.json` devidamente estruturado com scripts (`"start": "node server.js"`).
**Controle de Execução:** Suporte e manipulação da aplicação em background no terminal Linux Debian / Cloud Shell (`node server.js &`, `ps aux | grep node` e `kill -9 <PID>`).
---
# 5. Versionamento Git & GitHub (`README.md`)
**Conventional Commits:** Histórico de versionamento claro e padronizado (`feat:`, `fix:`, `test:`, `docs:`).
**Participação Equilibrada:** Contribuições ativas e visíveis de ambos os integrantes no repositório.
**Documentação Técnica Premium (`README.md`):**
  - Identificação clara da dupla, tema e instituição no cabeçalho.
  - Guia passo a passo de clonagem, instalação e execução.
  - Tabela completa de documentação de rotas/endpoints com parâmetros e códigos HTTP esperados.
---
# REQUISITOS DO PROJETO:
# 1. API RESTful (`server.js`)
* **Prefixos Globais:** Todas as rotas respondem obrigatoriamente sob o prefixo `/api/v1/`.
* **CRUD Completo em 2 Entidades Relacionadas (`Tecnicos` e `Chamados`):**
* `GET` — Listagem geral e consulta individual por ID.
* `POST` — Criação de novos registros.
* `PUT` — Substituição completa de registros existentes.
* `PATCH` — Atualização parcial de campos específicos (ex: `especialidade` ou `status`).
* `DELETE` — Remoção de registros por ID.

* **Validação Relacional de Regra de Negócio:** Proteção contra abertura ou edição de chamados vinculados a um `tecnicoId` inexistente.
* **Query Parameters:** Suporte obrigatório a filtros na listagem `GET` (ex: `?especialidade=Redes` e `?status=ABERTO`).
---
# 2. Padrões de Resposta & Status HTTP
* **`200 OK`:** Retornado em consultas (`GET`), edições totais/parciais (`PUT`/`PATCH`) e deleções (`DELETE`) bem-sucedidas.
* **`201 Created`:** Retornado na criação bem-sucedida de registros via `POST`.
* **`400 Bad Request`:** Retornado em falhas de validação de payload (campos obrigatórios ausentes ou referência a ID inválido).
* **`404 Not Found`:** Retornado quando a busca ou manipulação refere-se a um ID inexistente no banco de dados em memória.
---
# 3. Automação Shell Scripting (`testes_automacao.sh`)

* **Cobertura Total de Rotas:** Script em Bash executando chamadas HTTP via `curl` para os 12 cenários de teste da API.
* **Formatação de Resposta:** Manipulação e exibição formatada dos retornos JSON utilizando a ferramenta `jq`.
* **Geração de Log de Auditoria:** Redirecionamento e salvamento da saída limpa da suíte de testes no arquivo `resultado_execucao.log`.
---
# 4. Ambiente Linux Debian & Gestão de Processos
* **Configuração de Dependências:** Arquivo `package.json` devidamente estruturado com scripts (`"start": "node server.js"`).
* **Controle de Execução:** Suporte e manipulação da aplicação em background no terminal Linux Debian / Cloud Shell (`node server.js &`, `ps aux | grep node` e `kill -9 <PID>`).
---
# 5. Versionamento Git & GitHub
* **Conventional Commits:** Histórico de versionamento claro e padronizado (`feat:`, `fix:`, `test:`, `docs:`).
* **Participação Equilibrada:** Contribuições ativas e visíveis de ambos os integrantes no repositório.
* **Documentação Técnica:** Identificação clara da dupla, guia de instalação e tabela explicativa dos endpoints.
---
#  ESTRUTURA DOS ARQUIVOS:
sistema-chamados-ti/
├── server.js               # Código-fonte da API Express e regras de negócio
├── testes_automacao.sh     # Script Bash de automação dos testes HTTP
├── resultado_execucao.log  # Relatório em tempo real da execução dos testes
├── package.json            # Manifesto do projeto e dependências
└── README.md               # Documentação técnica completa
---
#  DOCUMENTAÇÃO DOS ENDPOINTS:
# 1. Módulo: Técnicos (`/api/v1/tecnicos`)
| Verbo | Rota | Parâmetros / Body | Descrição | Status HTTP |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/tecnicos` | `?especialidade=Redes` *(opcional)* | Lista todos os técnicos (aceita filtro por especialidade) | `200` |
| `GET` | `/api/v1/tecnicos/:id` | `id` na URL | Busca detalhes de um técnico por ID | `200 / 404` |
| `POST` | `/api/v1/tecnicos` | `{"nome", "especialidade"}` | Cadastra um novo técnico na base | `201 / 400` |
| `PUT` | `/api/v1/tecnicos/:id` | `{"nome", "especialidade"}` | Substituição completa dos dados do técnico | `200 / 400 / 404` |
| `PATCH` | `/api/v1/tecnicos/:id/especialidade` | `{"especialidade"}` | Atualização parcial da especialidade | `200 / 400 / 404` |
| `DELETE` | `/api/v1/tecnicos/:id` | `id` na URL | Remove o registro de um técnico | `200 / 404` |
---
# 2. Módulo: Chamados (`/api/v1/chamados`)
| Verbo | Rota | Parâmetros / Body | Descrição | Status HTTP |
| --- | --- | --- | --- | --- |
| `GET` | `/api/v1/chamados` | `?status=...` ou `?tecnicoId=...` | Consulta chamados com múltiplos filtros | `200` |
| `GET` | `/api/v1/chamados/:id` | `id` na URL | Busca detalhes de um chamado por ID | `200 / 404` |
| `POST` | `/api/v1/chamados` | `{"titulo", "descricao", "tecnicoId"}` | Abertura de um chamado de T.I. | `201 / 400` |
| `PUT` | `/api/v1/chamados/:id` | `{"titulo", "descricao", "status", "tecnicoId"}` | Substituição integral dos dados do chamado | `200 / 400 / 404` |
| `PATCH` | `/api/v1/chamados/:id/status` | `{"status"}` | Atualiza o status (`ABERTO`, `EM_ANDAMENTO`, `CONCLUIDO`) | `200 / 400 / 404` |
| `DELETE` | `/api/v1/chamados/:id` | `id` na URL | Exclui um chamado da base de dados | `200 / 404` |
---
#  GUIA DE EXECUÇÃO RÁPIDA:
1. **Clonar o repositório:**
```bash
git clone [https://github.com/mariaamorelo-eng/sistema-chamados-ti.git](https://github.com/mariaamorelo-eng/sistema-chamados-ti.git)
cd sistema-chamados-ti
```
2. **Instalar dependências:**
```bash
npm install
```
3. **Iniciar a aplicação:**
```bash
node server.js
```
> Servidor ativo na porta 1025: `http://localhost:1025`
---
#  AUTOMAÇÃO DE TESTES:
```bash
# 1. Iniciar a API em background (se necessário)
node server.js &

# 2. Conceder permissão de execução
chmod +x testes_automacao.sh

# 3. Executar a suíte de testes
./testes_automacao.sh

# 4. Inspecionar o relatório gerado
cat resultado_execucao.log
```
---
# GESTÃO DE PROCESSOS: 
```bash
# Executar o servidor em segundo plano
node server.js &

# Localizar o ID do processo (PID)
ps aux | grep node

# Encerrar o processo
kill -9 <PID>

```
# ENVIAR PARA O GITHUB:
```bash
git add README.md

git commit -m "docs: destaca integrantes e informacoes do projeto no cabecalho do README"

git push
```
---
