describe('time-tracker-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=projectscomponent--primary'));
  it('should render the component', () => {
    cy.get('time-tracker-projects').should('exist');
  });
});
