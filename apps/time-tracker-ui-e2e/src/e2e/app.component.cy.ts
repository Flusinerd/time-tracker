describe('time-tracker-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('time-tracker-root').should('exist');
  });
});
