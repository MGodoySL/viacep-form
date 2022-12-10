var cepField = document.querySelector("#cep");
var street = document.querySelector("#endereco");
var district = document.querySelector("#bairro");
var city = document.querySelector("#cidade");
var state = document.querySelector("#estado");
var errorCep = document.querySelector("#erro");

async function getAddress(cep) {
    errorCep.innerHTML = "";
    try {
        var getCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var convertedCep = await getCep.json();

        if (convertedCep.erro) {
            throw Error(errorCep.innerHTML = `<p>Cep Inválido</p>`);
        }

        street.value = convertedCep.logradouro;
        district.value = convertedCep.bairro;
        city.value = convertedCep.localidade;
        state.value = convertedCep.uf;
    } catch (error) {
        errorCep.innerHTML = `<p>Cep Inválido</p>`
    }
}

cepField.addEventListener("focusout", () => {
    getAddress(cepField.value);
});
