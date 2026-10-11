// Configuração do Supabase
const SUPABASE_URL = 'https://kthvsbhubmerufrtzip.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3Ck_k8g01wPQJiHB2PG4sQ_VetmQ...'; // Substitua se necessário, mas já está com a sua chave copiada

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Verificar sessão ativa ao carregar a página
window.onload = async function() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        document.getElementById('loginOverlay').style.display = 'none';
        carregarEquipamentos();
    } else {
        document.getElementById('loginOverlay').style.display = 'flex';
    }
};

// Função de Login Real com Supabase Auth
async function fazerLogin() {
    const email = document.getElementById('usuarioInput').value;
    const password = document.getElementById('senhaInput').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("Erro no login: " + error.message);
    } else {
        alert("Login efetuado com sucesso!");
        document.getElementById('loginOverlay').style.display = 'none';
        carregarEquipamentos();
    }
}

// Função de Logout (Sair)
async function fazerLogout() {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
        window.location.reload(); // Recarrega a página e mostra o login de novo
    } else {
        alert("Erro ao terminar sessão: " + error.message);
    }
}

// Funções de Inventário (Mantém a estrutura do seu projeto)
function carregarEquipamentos() {
    console.log("Inventário carregado com sucesso!");
    // Aqui continuará a sua lógica para buscar os dados na tabela
}

function adicionarEquipamento() {
    // Lógica para adicionar equipamento
}