import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('the user is in home page', () =>{
    cy.visit('/')
    cy.get('.font-bold').contains('JSONPlaceholder').should('contain.text', 'JSONPlaceholder').should('be.visible')
})

When('he navigate to guide page', () =>{
    cy.get('.mr-4').contains('Guide').should('contain.text', 'Guide').click()
    
})

And('click to open the link from array of albums', () =>{
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/albums/1/photos').as("getPhotos")
    cy.get('.container > ul > :nth-child(2) > a').click()
})

Then('a page will be opened with an array of photos', () => { 
    cy.wait('@getPhotos').its('response.statusCode').should('eq', 200)
})

And('the array with id {string} will has {string} information', (arrayId, parameter) =>{
    cy.get('@getPhotos').then((response) =>{
        
        const item = response.response.body.find((element) => element.id === 6);

        expect(item).to.not.be.undefined;
        expect(item).to.have.property('albumId', 1);
        expect(item).to.have.property('id', 6);
        expect(item).to.have.property('title', 'accusamus ea aliquid et amet sequi nemo');
        expect(item).to.have.property('url', 'https://via.placeholder.com/600/56a8c2');
        expect(item).to.have.property('thumbnailUrl', 'https://via.placeholder.com/150/56a8c2');
    })
})