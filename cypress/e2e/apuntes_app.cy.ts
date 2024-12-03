describe('Apuntes App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/home ');
  });
  it('Deberia iniciar sesion y crear una tarea', () => {
    Cypress.on('uncaught:exception', (err) => {
      console.error('Excepción no capturada:', err.message);
      return false; // Ignora el error
    });
    cy.contains('Iniciar Sesion').click();
    cy.contains('Correo').click();
    cy.get('input:first').type('test@test.com');
    cy.get('input:last').type('12345678');
    cy.get('#form-login-button').click();
    cy.get('#task-tab').click();
    cy.get('#addTask').click();
    cy.get('[name="taskName"]').type('Test');
    cy.get('[name="taskDate"]').type('01/01/2023');
    cy.contains('Crear nueva Tarea').click();
    cy.get('#task-spinner').should('be.visible');
    cy.get('p-orderList').should('contain.text', 'Test');
  });
});
