const apiKey = '0a9afa4590074924bec09a8d98528c3f'; 
const converterBtn = document.getElementById('converter-btn');
const resultadoDiv = document.getElementById('resultado');

converterBtn.addEventListener('click', () => {
    const valor = document.getElementById('valor').value;
    const moedaOrigem = document.getElementById('moeda-origem').value;
    const moedaDestino = document.getElementById('moeda-destino').value;

    if (!valor) {
        resultadoDiv.textContent = 'Por favor, insira um valor.';
        return;
    }

    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultadoDiv.textContent = `Erro: ${data.description}`;
                return;
            }

            const taxaOrigem = data.rates[moedaOrigem];
            const taxaDestino = data.rates[moedaDestino];
            const valorConvertido = (valor / taxaOrigem) * taxaDestino;

            resultadoDiv.textContent = `${valor} ${moedaOrigem} = ${valorConvertido.toFixed(2)} ${moedaDestino}`;
        })
        .catch(error => {
            resultadoDiv.textContent = 'Erro ao obter as taxas de câmbio.';
            console.error(error);
        });
});