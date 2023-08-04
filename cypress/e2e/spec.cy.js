/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  
  beforeEach(() => {
    cy.visit('../src/index.html');
    
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, ';

    cy.get('#firstName')
     .should('be.visible')
     .type('Lucas');

    cy.get('#lastName')
     .should('be.visible')
     .type('Beninca');

    cy.get('#email')
     .should('be.visible')
     .type('lebbeninca@gmail.com');

    cy.get('#open-text-area')
     .should('be.visible')
     .type(longText, { delay: 0 });

    cy.contains('button','Enviar')
     .click();

    cy.get('.success')
     .should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName')
     .should('be.visible')
     .type('Lucas');

    cy.get('#lastName')
     .should('be.visible')
     .type('Beninca');

    cy.get('#email')
     .should('be.visible')
     .type('lebbeninca@');

    cy.get('#open-text-area')
     .should('be.visible')
     .type('teste');

    cy.contains('button','Enviar')
     .click();

    cy.get('body > span.error > strong')
     .should('have.text','Valide os campos obrigatórios!');

  });

  it('Valida input numero de telefone', function () {
    cy.get('#phone').should('be.visible')
     .type('testeeeeeeeeeeeeeeeeeeeeeeeeeeee')
     .should('have.value','');

  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName')
     .should('be.visible')
     .type('Lucas');

    cy.get('#lastName')
     .should('be.visible')
     .type('Beninca');

    cy.get('#email')
     .should('be.visible')
     .type('lebbeninca@gmail.com');

    cy.get('#phone-checkbox')
     .should('be.visible').check()
     .should('be.checked');

    cy.contains('button','Enviar')
     .click();
    
    cy.get('body > span.error').should('be.visible');

  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName').type('Lucas');
    cy.should('have.value','Lucas');

    cy.get('#lastName').type('Beninca');
    cy.should('have.value','Beninca');

    cy.get('#email').type('lebbeninca@gmail.com');
    cy.should('have.value','lebbeninca@gmail.com');

    cy.get('#firstName').clear().should('have.value','');
    cy.get('#lastName').clear().should('have.value','');
    cy.get('#email').clear().should('have.value','');

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios' , function(){
    cy.contains('button','Enviar')
     .click();
    
    cy.get('body > span.error').should('be.visible');

  })

  it('envia o formuário com sucesso usando um comando customizado' , function(){
      cy.fillMandatoryFieldsAndSubmit();
      cy.get('.success').should('be.visible');

  })

  it('seleciona um produto (youtube) utilizando o select pelo seu texto', function(){
    cy.get('#product')
    .select('YouTube')
    .should('have.value','youtube'); 
  })

  it('seleciona um protudo (mentoria) utilizando o select pelo seu value', function(){
    cy.get('#product')
    .select('mentoria')
    .should('have.value','mentoria');
 
  })

  it('seleciona um protudo (blog) utilizando o select pelo seu indice', function(){
    cy.get('#product')
    .select(1)
    .should('have.value','blog');
  })
  
  it('marca tipo de atendimento com check', function(){
    cy.get('[type="radio"]')
    .check('feedback')
    .should('be.checked','feedback');


  })

   
  it('marca cada tipo de atendimento com check', function(){
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')

    })

  })

  it.only('marca ambos checkbox', function(){
    cy.get('#check input[type="checkbox"]')
    .as('checkboxes')
    .check();    
// verfica que ambos os checkbox foram marcados
    cy.get('@checkboxes')
    .each(checkbox => {
     expect(checkbox[0].checked).to.equal(true)
  })
  //pode ser usado o .last para pegar o ultimo sem a necessidade de um novo cy.get
  cy.get('#phone-checkbox').uncheck()
  .should('not.be.checked');
  

  })
  
})


