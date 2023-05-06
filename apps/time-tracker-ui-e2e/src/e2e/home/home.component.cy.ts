describe('time-tracker-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=homecomponent--primary'));
  it('should render the component', () => {
    cy.get('time-tracker-home').should('exist');
  });
});
