describe('time-tracker-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sidebarcomponent--primary'));
  it('should render the component', () => {
    cy.get('time-tracker-sidebar').should('exist');
  });
});
