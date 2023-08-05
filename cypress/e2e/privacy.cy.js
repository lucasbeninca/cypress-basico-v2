/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
  
    beforeEach(() => {
      cy.visit('../src/privacy.html');
      
    })

    it('testa a página da política de privacidade de forma independent', function(){
        cy.title('#title').should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade');
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible');
        cy.contains('Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.').should('be.visible');
        cy.contains('No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.').should('be.visible');

        
        cy.contains('Talking About Testing').should('be.visible');
    })


});  