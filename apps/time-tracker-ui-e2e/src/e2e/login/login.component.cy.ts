describe('time-tracker-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logincomponent--primary'));
  it('should render the component', () => {
    cy.get('time-tracker-login').should('exist');
  });
});
