// Configuração do Supabase (URL e Chave Corretos)
const SUPABASE_URL = 'https://kthvsbhubmerufrtzpf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3Ck_k8g01wPQJiHB2PG4sQ_VetmQfMK';

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
    const email = document.getElementById('usuarioInput').value.trim();
    const password = document.getElementById('senhaInput').value;

    if (!email || !password) {
        alert("Por favor, preencha o e-mail e a palavra-passe.");
        return;
    }

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
        window.location.reload();
    } else {
        alert("Erro ao terminar sessão: " + error.message);
    }
}

// Funções do Inventário
function carregarEquipamentos() {
    console.log("Inventário carregado com sucesso!");
}

function adicionarEquipamento() {
    // Lógica para adicionar equipamento
}