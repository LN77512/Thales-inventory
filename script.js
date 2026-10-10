// INSIRA O SEU LINK DA API DO SHEETDB ENTRE AS ASPAS ABAIXO:
const API_URL = 'https://sheetdb.io/api/v1/1uzwsshlgu3x9';

let equipamentos = [];

// Carrega os dados da nuvem assim que a página abre
window.onload = function() {
    carregarEquipamentos();
};

function carregarEquipamentos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            equipamentos = data;
            atualizarTabela();
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
            alert('Erro ao ligar à base de dados na nuvem. Verifique o URL da API.');
        });
}

function salvarEquipamento() {
    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const status = document.getElementById('status').value;
    let responsavel = document.getElementById('responsavel').value;
    const editId = document.getElementById('editId').value;

    if (!nome || !categoria) {
        alert('Por favor, preencha o nome e a categoria!');
        return;
    }

    if (!responsavel) responsavel = "-";

    if (editId === "") {
        // Criar Novo ID automático
        const novoId = equipamentos.length > 0 ? Math.max(...equipamentos.map(e => parseInt(e.id) || 0)) + 1 : 1;
        
        const novoEquipamento = {
            id: novoId,
            nome: nome,
            categoria: categoria,
            status: status,
            responsavel: responsavel
        };

        // Enviar para a nuvem (Google Sheets / Excel online)
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [novoEquipamento] })
        })
        .then(response => response.json())
        .then(data => {
            alert('Equipamento registado na nuvem com sucesso!');
            carregarEquipamentos();
            limparFormulario();
        })
        .catch(error => alert('Erro ao guardar equipamento.'));

    } else {
        // Atualizar existente na nuvem
        const dadosAtualizados = {
            nome: nome,
            categoria: categoria,
            status: status,
            responsavel: responsavel
        };

        fetch(`${API_URL}/id/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: dadosAtualizados })
        })
        .then(response => response.json())
        .then(data => {
            alert('Equipamento atualizado na nuvem com sucesso!');
            carregarEquipamentos();
            limparFormulario();
        })
        .catch(error => alert('Erro ao atualizar equipamento.'));
    }
}

function atualizarTabela() {
    const tbody = document.querySelector('#tabelaEquipamentos tbody');
    tbody.innerHTML = '';

    if (equipamentos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhum equipamento registado.</td></tr>`;
        return;
    }

    equipamentos.forEach(eq => {
        tbody.innerHTML += `<tr>
            <td>${eq.id}</td>
            <td>${eq.nome}</td>
            <td>${eq.categoria}</td>
            <td>${eq.status}</td>
            <td>${eq.responsavel}</td>
            <td>
                <button class="btn-editar" onclick="prepararEdicao('${eq.id}', '${eq.nome}', '${eq.categoria}', '${eq.status}', '${eq.responsavel}')">Editar</button>
                <button class="btn-apagar" onclick="apagarEquipamento('${eq.id}')">Apagar</button>
            </td>
        </tr>`;
    });
}

function prepararEdicao(id, nome, categoria, status, responsavel) {
    document.getElementById('nome').value = nome;
    document.getElementById('categoria').value = categoria;
    document.getElementById('status').value = status;
    document.getElementById('responsavel').value = responsavel === "-" ? "" : responsavel;
    document.getElementById('editId').value = id;
    document.getElementById('btnSalvar').innerText = "Atualizar Equipamento";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function apagarEquipamento(id) {
    if (confirm('Tem a certeza de que deseja apagar este equipamento da nuvem?')) {
        fetch(`${API_URL}/id/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Equipamento apagado com sucesso!');
            carregarEquipamentos();
            limparFormulario();
        })
        .catch(error => alert('Erro ao apagar equipamento.'));
    }
}

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('responsavel').value = '';
    document.getElementById('status').value = 'Disponível';
    document.getElementById('editId').value = '';
    document.getElementById('btnSalvar').innerText = "Adicionar Equipamento";
}