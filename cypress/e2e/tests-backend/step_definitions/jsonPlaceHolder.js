import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

let parameter
let value
let username
let id

Given('I will search for parameter {string} and value {string}', (receivedParameter, receivedValue) =>{
    parameter = receivedParameter
    value = receivedValue
})

When('I call the api get', () =>{
    let url = Cypress.env('url_api')+'/comments?'+parameter+'='+value

    cy.request(url).then((response) =>{
        cy.wrap(response).as('response')
    })
})

Then('I receive an status code 200', () =>{
    cy.get('@response').then((response) =>{
        expect(response.status).to.eq(200)
    })
})

And('The email value need to be {string}', (email) =>{
    cy.get('@response').then((response) =>{
        expect(response.body[0].email).to.eq(email)
    })
})

Given('I will insert a new username called {string}', (receivedUsername) =>{
    username = receivedUsername
})


Given('I will change values from user with id {string}', (receivedId) =>{
    id = receivedId
})

When('I call the api post', () =>{
    let url = Cypress.env('url_api')+'/users'

    cy.request({
        method: 'POST',
        url: url,
        body: {
            'username': username
          },
    }).then((response) =>{
        cy.wrap(response).as('response')
    })
})

When('I call the api put', () =>{
    let url = Cypress.env('url_api')+'/users/' + id

    cy.request({
        method: 'PUT',
        url: url,
        body: {
            'email': "trocandooemail@email.com",
            'lat': '99999999',
            'lng': '11111111'
          },
    }).then((response) =>{
        cy.wrap(response).as('response')
    })
})

Then('I receive an status code 201', () =>{
    cy.get('@response').then((response) =>{
        expect(response.status).to.eq(201)
    })
})

And('the response will has an id', () =>{
    cy.get('@response').then((response) =>{
        expect(response.body).to.have.property('id')
    })
})

And('the response will has the same values I changed', () =>{
    cy.get('@response').then((response) =>{
        expect(response.body).to.have.property('email')
        expect(response.body).to.have.property('lat')
        expect(response.body).to.have.property('lng')
    })
})