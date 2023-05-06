describe('time-tracker-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=loginfailurecomponent--primary'));
  it('should render the component', () => {
    cy.get('time-tracker-login-failure').should('exist');
  });
});
