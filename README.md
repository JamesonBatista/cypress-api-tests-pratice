# Cypress API Tests Practice

Este projeto é um exemplo de como realizar testes automatizados de API utilizando o Cypress.

## Funções da Classe `Requests`

A classe `Requests` é responsável por realizar requisições HTTP para endpoints da API e validar as respostas. Abaixo estão as funções disponíveis:

### `Environment()`

Retorna o ambiente configurado na variável de ambiente `Cypress.env('environment')`.

### `request(env, request)`

Realiza uma requisição HTTP para o ambiente especificado e retorna a resposta da requisição.

- `env`: URL do ambiente para realizar a requisição.
- `request` (opcional): Método da requisição (GET, POST, PUT, DELETE). O padrão é GET.

### `validateJSONFields(jsonObj, fieldsToIgnore = [])`

Valida se os campos de um objeto JSON não estão vazios ou nulos.

- `jsonObj`: O objeto JSON que será validado.
- `fieldsToIgnore` (opcional): Array de campos a serem ignorados na validação.

### `findInJson(obj, keyToFind, position = 1)`

Procura por um valor específico em um objeto JSON.

- `obj`: O objeto JSON onde a busca será realizada.
- `keyToFind`: A chave que você deseja encontrar.
- `position` (opcional): A posição do valor se ele for um array (default: 1).

## Utilização

1. Importe a classe `Requests` no arquivo de teste:
   ```javascript
   import { Requests as _cy } from "./caminho-para-requests";
   ```
