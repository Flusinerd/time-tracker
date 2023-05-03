describe('time-tracker-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nxwelcomecomponent--primary'));
  it('should render the component', () => {
    cy.get('time-tracker-nx-welcome').should('exist');
  });
});
