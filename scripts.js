// Substitui pelo teu ID do CrudCrud
const url = 'https://crudcrud.com/api/4a67595fdba1450aaa8769b8853b4ba3/clientes';

async function buscarClientes() {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const lista = document.getElementById('listaClientes');
        if (!lista) return; // Segurança contra o erro anterior
        
        lista.innerHTML = '';
        dados.forEach(c => {
            lista.innerHTML += `<li>${c.name} - ${c.email} <button class="btn-excluir" onclick="deletar('${c._id}')">X</button></li>`;
        });
    } catch (e) { console.error("Erro:", e); }
}

async function adicionarCliente() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) return alert("Preenche tudo!");

    const resposta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });

    if (resposta.ok) {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        buscarClientes();
    }
}

async function deletar(id) {
    await fetch(`${url}/${id}`, { method: 'DELETE' });
    buscarClientes();
}

// Garante que o código corre quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', buscarClientes);