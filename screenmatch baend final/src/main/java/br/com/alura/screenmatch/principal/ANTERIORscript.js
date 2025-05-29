document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const seriesList = document.getElementById('seriesList');

    // URL base da sua API de séries
    // Ajuste esta URL para o endereço real do seu backend Spring Boot
    const API_BASE_URL = 'http://localhost:8080/series'; // Exemplo: assumindo que /series é o endpoint base

    // Função para buscar séries
    async function fetchSeries(title = '') {
        seriesList.innerHTML = '<p>Carregando séries...</p>'; // Mensagem de carregamento
        let url = API_BASE_URL;

        if (title) {
            // Exemplo de endpoint para busca por título.
            // VOCÊ PRECISARÁ AJUSTAR ISSO PARA O SEU ENDPOINT REAL.
            // Por exemplo, se seu endpoint for /series/titulo?nome=nomeDaSerie
            url = `${API_BASE_URL}/titulo?nome=${encodeURIComponent(title)}`;
        } else {
            // Exemplo de endpoint para listar todas as séries
            // VOCÊ PRECISARÁ AJUSTAR ISSO PARA O SEU ENDPOINT REAL.
            // Por exemplo, se seu endpoint para listar todas for /series
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displaySeries(data);
        } catch (error) {
            console.error('Erro ao buscar séries:', error);
            seriesList.innerHTML = '<p>Não foi possível carregar as séries. Verifique a URL da API ou o servidor.</p>';
        }
    }

    // Função para exibir as séries na interface
    function displaySeries(series) {
        seriesList.innerHTML = ''; // Limpa os resultados anteriores

        if (series.length === 0) {
            seriesList.innerHTML = '<p>Nenhuma série encontrada.</p>';
            return;
        }

        series.forEach(serie => {
            const serieCard = document.createElement('div');
            serieCard.classList.add('serie-card');

            // Ajuste os nomes das propriedades (titulo, totalTemporadas, avaliacao)
            // para corresponderem exatamente aos nomes dos campos no JSON que sua API retorna.
            serieCard.innerHTML = `
                <h3>${serie.titulo}</h3>
                <p>Temporadas: ${serie.totalTemporadas}</p>
                <p>Avaliação: ${serie.avaliacao ? serie.avaliacao.toFixed(1) : 'N/A'}</p>
                <p>Gênero: ${serie.genero || 'N/A'}</p>
            `;
            seriesList.appendChild(serieCard);
        });
    }

    // Event Listeners
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        fetchSeries(searchTerm);
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    // Carrega todas as séries ao carregar a página inicialmente
    fetchSeries();
});