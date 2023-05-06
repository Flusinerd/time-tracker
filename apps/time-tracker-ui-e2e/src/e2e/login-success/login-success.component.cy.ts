describe('time-tracker-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=loginsuccesscomponent--primary'));
  it('should render the component', () => {
    cy.get('time-tracker-login-success').should('exist');
  });
});
