SISTEMA DE CHAMADOS DE SUPORTE T.I.
Integrantes: Maria Eduarda Morelo e Felipe Pereira Limeira de Souza

Curso: Programação Back-End 1 (PBE1) — SENAI / Binário Tech

Tema: Tema 5 — Sistema de Chamados de Suporte T.I.

Ambiente: Linux Debian / Google Cloud Shell (Porta 1025)

0. Iniciar e Parar o Servidor no Linux
Bash
# Subir o servidor em segundo plano (background)
node server.js &

# Ver o ID do processo (PID) caso precise parar depois
ps aux | grep node

# Encerrar o servidor
kill -9 <PID>
1. Módulo: Técnicos (/api/v1/tecnicos)
Cadastrar Técnicos (POST — Status 201 Created)

Bash
# Criar Técnico 1
curl -s -X POST http://localhost:1025/api/v1/tecnicos -H "Content-Type: application/json" -d '{"nome": "Maria Eduarda Morelo", "especialidade": "Redes"}' | jq .

# Criar Técnico 2
curl -s -X POST http://localhost:1025/api/v1/tecnicos -H "Content-Type: application/json" -d '{"nome": "Felipe Souza", "especialidade": "Hardware"}' | jq .
Consultar e Filtrar Técnicos (GET — Status 200 OK)

Bash
# Listar todos os técnicos
curl -s http://localhost:1025/api/v1/tecnicos | jq .

# Filtrar por especialidade (Query Parameter)
curl -s "http://localhost:1025/api/v1/tecnicos?especialidade=Redes" | jq .

# Buscar técnico específico por ID
curl -s http://localhost:1025/api/v1/tecnicos/1 | jq .
Atualizar Técnicos (PUT e PATCH — Status 200 OK)

Bash
# Substituição completa (PUT)
curl -s -X PUT http://localhost:1025/api/v1/tecnicos/2 -H "Content-Type: application/json" -d '{"nome": "Felipe Pereira Souza", "especialidade": "Infraestrutura"}' | jq .

# Atualização parcial apenas da especialidade (PATCH)
curl -s -X PATCH http://localhost:1025/api/v1/tecnicos/1/especialidade -H "Content-Type: application/json" -d '{"especialidade": "Seguranca da Informacao"}' | jq .
2. Módulo: Chamados (/api/v1/chamados)
Abrir Chamados (POST — Status 201 Created)

Bash
# Abrir Chamado 1 vinculado ao Técnico 1
curl -s -X POST http://localhost:1025/api/v1/chamados -H "Content-Type: application/json" -d '{"titulo": "Queda de rede no setor B", "descricao": "Switch sem conectividade", "tecnicoId": 1}' | jq .

# Abrir Chamado 2 vinculado ao Técnico 2
curl -s -X POST http://localhost:1025/api/v1/chamados -H "Content-Type: application/json" -d '{"titulo": "Troca de SSD", "descricao": "Estacao de trabalho lenta", "tecnicoId": 2}' | jq .
Consultar e Filtrar Chamados (GET — Status 200 OK)

Bash
# Listar todos os chamados
curl -s http://localhost:1025/api/v1/chamados | jq .

# Filtrar por status (Query Parameter)
curl -s "http://localhost:1025/api/v1/chamados?status=ABERTO" | jq .

# Filtrar por técnico responsável (Query Parameter)
curl -s "http://localhost:1025/api/v1/chamados?tecnicoId=1" | jq .

# Buscar chamado específico por ID
curl -s http://localhost:1025/api/v1/chamados/1 | jq .
Atualizar Chamados (PUT e PATCH — Status 200 OK)

Bash
# Substituição completa do chamado (PUT)
curl -s -X PUT http://localhost:1025/api/v1/chamados/2 -H "Content-Type: application/json" -d '{"titulo": "Troca de SSD NVMe", "descricao": "Instalacao de SSD 1TB concluida", "status": "EM_ANDAMENTO", "tecnicoId": 2}' | jq .

# Atualização parcial apenas do status (PATCH)
curl -s -X PATCH http://localhost:1025/api/v1/chamados/1/status -H "Content-Type: application/json" -d '{"status": "CONCLUIDO"}' | jq .
3. Testes de Validação e Erros (400 e 404)
Bash
# Erro 400 Bad Request: Faltando campo obrigatório
curl -i -s -X POST http://localhost:1025/api/v1/tecnicos -H "Content-Type: application/json" -d '{"nome": "Tecnico Incompleto"}'

# Erro 400 Bad Request: Chamado vinculado a tecnicoId inexistente (999)
curl -i -s -X POST http://localhost:1025/api/v1/chamados -H "Content-Type: application/json" -d '{"titulo": "Erro", "descricao": "Teste de validacao", "tecnicoId": 999}'

# Erro 404 Not Found: Buscar técnico inexistente
curl -i -s http://localhost:1025/api/v1/tecnicos/999

# Erro 404 Not Found: Buscar chamado inexistente
curl -i -s http://localhost:1025/api/v1/chamados/999
4. Remoção de Registros (DELETE — Status 200 OK)
Bash
# Deletar Chamado 2
curl -s -X DELETE http://localhost:1025/api/v1/chamados/2 | jq .

# Deletar Técnico 2
curl -s -X DELETE http://localhost:1025/api/v1/tecnicos/2 | jq .
