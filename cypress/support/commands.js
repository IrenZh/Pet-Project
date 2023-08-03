import { links } from '../e2e/static';

Cypress.Commands.add('loginViaApi', (email, password) => { 
    cy.request({
        method: 'POST',
        url: links.loginUrl,
        qs: {route: 'account/login'},
        body: {
            email,
            password,
        },
    }).then((response) => {
        expect(response.status).to.equal(200);
    });
});