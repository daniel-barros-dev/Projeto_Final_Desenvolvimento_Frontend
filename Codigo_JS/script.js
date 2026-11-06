// Aguarda o carregamento completo do DOM (Conceito da Aula 11)[cite: 165]
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. TEMA CLARO / ESCURO ---
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Se houver um botão de alternar tema na página, adicionamos o evento (Opcional/Seguro)
    const btnTema = document.querySelector('#btn-tema');
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('tema', isDark ? 'dark' : 'light');
        });
    }

    // --- 2. VALIDAÇÃO E CAPTURA DO FORMULÁRIO DE CADASTRO  ---
    const formCadastro = document.querySelector('#form-manutencao');

    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            // Capturar e limpar valores dos inputs (.value e .trim())
            const servico = document.querySelector('#servico').value.trim();
            const km = document.querySelector('#km').value.trim();
            const data = document.querySelector('#data_manutencao').value;
            const custo = document.querySelector('#custo').value.trim();
            const categoria = document.querySelector('#categoria').value;

            // Validação simples obrigatória
            if (servico === '' || km === '' || data === '') {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Criar objeto da nova manutenção 
            const novaManutencao = {
                id: Date.now(),
                servico,
                km,
                data,
                custo: custo ? custo : '0,00',
                categoria
            };

            // Recuperar dados existentes do localStorage ou criar array vazio (JSON.parse/stringify)
            let listaManutencoes = JSON.parse(localStorage.getItem('manutencoes')) || [];
            
            // Adicionar ao array (Conceito de Array.push)
            listaManutencoes.push(novaManutencao);

            // Salvar de volta no localStorage convertendo para string JSON
            localStorage.setItem('manutencoes', JSON.stringify(listaManutencoes));

            alert('Manutenção registada com sucesso no navegador!');
            formCadastro.reset(); // Limpa o formulário
        });
    }

    // --- 3. RENDERIZAÇÃO DINÂMICA NA TABELA DE MANUTENÇÕES  ---
    const tabelaTbody = document.querySelector('#tabela-manutencoes-corpo');

    if (tabelaTbody) {
        // Buscar dados salvos no localStorage
        const dadosSalvos = JSON.parse(localStorage.getItem('manutencoes')) || [];

        if (dadosSalvos.length > 0) {
            // Usando o método .map() para transformar o array de objetos em elementos HTML (Aula 12)
            tabelaTbody.innerHTML = dadosSalvos.map(item => `
                <tr>
                    <td><time datetime="${item.data}">${item.data}</time></td>
                    <td>${item.km} km</td>
                    <td>${item.servico} (${item.categoria})</td>
                    <td>${item.custo}</td>
                    <td><mark style="background-color: #c6f6d5; color: #22543d;">Salvo Local</mark></td>
                </tr>
            `).join('');
        }
    }
});