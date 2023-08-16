import { Requests as _cy } from "../support/requests"

describe('Validations API Rest', () => {

  let env = _cy.Environment()

  it('First Test and validation API Rest', async () => {

    const response = await _cy.request(env.api)
    console.log(JSON.stringify(response.body))

    const data = _cy.findInJson(response, 'data')
    console.log(data) // vai retornar o array data

    const per_page = _cy.findInJson(response, 'per_page')
    console.log(per_page) // irá retornar o per_page do JSON


    // caso precise validar um valor usando o expect
    // basta passar o path e o valor
    _cy.expect_validation(response, "per_page")

    // e usando a mesma funcao para comparar o valor
    _cy.expect_validation(response, "per_page", 6)

  })
})