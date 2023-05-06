describe('time-tracker-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=projectformcomponent--primary'));
  it('should render the component', () => {
    cy.get('time-tracker-project-form').should('exist');
  });
});
