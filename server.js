const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Banco de dados em memoria
let tecnicos = [
    { id: 1, nome: "Carlos Silva", especialidade: "Redes" },
    { id: 2, nome: "Ana Souza", especialidade: "Sistemas" }
];

let chamados = [
    { id: 1, titulo: "Sem acesso a internet", descricao: "PC do setor financeiro sem rede", status: "ABERTO", tecnicoId: 1 },
    { id: 2, titulo: "Impressora travada", descricao: "Impressora da recepcao nao imprime", status: "EM_ANDAMENTO", tecnicoId: 2 }
];

let tecnicoIdCounter = 3;
let chamadoIdCounter = 3;

// ==========================================
// 1. ROTAS DO RECURSO: TECNICOS
// ==========================================

// GET /api/v1/tecnicos - Listar todos os tecnicos (Filtro por ?especialidade)
app.get('/api/v1/tecnicos', (req, res) => {
    const { especialidade } = req.query;
    if (especialidade) {
        const filtrados = tecnicos.filter(t => t.especialidade.toLowerCase() === especialidade.toLowerCase());
        return res.status(200).json(filtrados);
    }
    res.status(200).json(tecnicos);
});

// GET /api/v1/tecnicos/:id - Buscar tecnico por ID
app.get('/api/v1/tecnicos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tecnico = tecnicos.find(t => t.id === id);
    if (!tecnico) {
        return res.status(404).json({ erro: "Tecnico nao encontrado na base de dados." });
    }
    res.status(200).json(tecnico);
});

// POST /api/v1/tecnicos - Cadastrar novo tecnico
app.post('/api/v1/tecnicos', (req, res) => {
    const { nome, especialidade } = req.body;
    if (!nome || !especialidade) {
        return res.status(400).json({ erro: "Campos 'nome' e 'especialidade' sao obrigatorios." });
    }
    const novoTecnico = {
        id: tecnicoIdCounter++,
        nome,
        especialidade
    };
    tecnicos.push(novoTecnico);
    res.status(201).json(novoTecnico);
});

// PUT /api/v1/tecnicos/:id - Substituir dados do tecnico (Substituicao total)
app.put('/api/v1/tecnicos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, especialidade } = req.body;
    const tecnico = tecnicos.find(t => t.id === id);

    if (!tecnico) {
        return res.status(404).json({ erro: "Tecnico nao encontrado para substituicao." });
    }
    if (!nome || !especialidade) {
        return res.status(400).json({ erro: "Todos os campos ('nome' e 'especialidade') sao obrigatorios no PUT." });
    }

    tecnico.nome = nome;
    tecnico.especialidade = especialidade;

    res.status(200).json({ mensagem: "Tecnico atualizado com sucesso!", tecnico });
});

// PATCH /api/v1/tecnicos/:id/especialidade - Atualizar especialidade (Atualizacao parcial)
app.patch('/api/v1/tecnicos/:id/especialidade', (req, res) => {
    const id = parseInt(req.params.id);
    const { especialidade } = req.body;
    const tecnico = tecnicos.find(t => t.id === id);

    if (!tecnico) {
        return res.status(404).json({ erro: "Tecnico nao encontrado." });
    }
    if (!especialidade) {
        return res.status(400).json({ erro: "O campo 'especialidade' e obrigatorio." });
    }

    tecnico.especialidade = especialidade;
    res.status(200).json({ mensagem: "Especialidade atualizada com sucesso!", tecnico });
});

// DELETE /api/v1/tecnicos/:id - Remover tecnico
app.delete('/api/v1/tecnicos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tecnicos.
