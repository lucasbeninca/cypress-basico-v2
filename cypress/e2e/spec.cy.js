describe('template spec', () => {
  it('passes', () => {
    cy.visit('./src/index.html');
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
    
  })
})