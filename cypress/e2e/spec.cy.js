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
    cy.get('#dfirstName')
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

  it('marca ambos checkbox', function(){
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

it('seleciona um arquivo da pasta fixtures', function(){
cy.get('input[type="file"]')
.should('not.have.value')
.selectFile('cypress/fixtures/example.json')
.then(input => {
  expect(input[0].files[0].name).to.equal('example.json');
  })
})

it('seleciona um arquivo simulando um drag-and-drop', function(){
  cy.get('input[type="file"]')
  .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
  .then(input => {
    expect(input[0].files[0].name).to.equal('example.json');
    })

})

// conteudo complementar: https://www.youtube.com/watch?v=xwltoOnmfVE
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
  cy.fixture('example.json', { encoding: null }).as('exampleFile')
  cy.get('input[type="file"]')
  .selectFile('@exampleFile')
  .then(input => {
    expect(input[0].files[0].name).to.equal('example.json');
    })

})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
  cy.get('#privacy a')
  .should('have.attr', 'target', '_blank');

})

it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
  cy.get('#privacy a')
  .invoke('removeAttr','target','_blank')
  .click();
  cy.contains('Talking About Testing').should('be.visible');

})

  
})


