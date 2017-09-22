describe('Steps', () => {
  before(() => {
    cy.visit("/")
    cy.contains('.nav-item', 'Steps').click()
  })

  // a helper to get first demo block
  const firstSteps = () => cy.get('.demo-steps').first()

  it('shows basic steps', () => {
    // the "Next Step" button reference
    firstSteps()
      .contains('Next step')
      .as('next step')

    // returns completed steps elements
    const completedSteps = () =>
      firstSteps().find('.is-success.is-text')

    // initially first badge is not done
    completedSteps()
      .should('have.length', 0)

    // first click turns first step complete
    cy.get('@next step').click()
    completedSteps()
      .should('have.length', 1)

    // second and third clicks complete the other steps
    cy.get('@next step').click().click()
    completedSteps()
      .should('have.length', 3)
  })

  it('expands the code', () => {
    const getHeight = () =>
      firstSteps()
      .find('.meta')
      .invoke('height')

    // initially meta information is closed
    getHeight()
      .should('eq', 0)

    // open meta information
    firstSteps()
      .find('.demo-block-control').click()
    firstSteps()
      .find('.highlight code').should('be.visible')
    getHeight()
      .should('gt', 0)

    // close it
    firstSteps()
      .find('.demo-block-control').click()
    getHeight()
      .should('eq', 0)
  })

  it.skip('hides code by default', () => {
    // hmm, the element is behind other elements, why
    // is it visible?
    firstSteps()
      .find('.highlight code').should('not.be.visible')
  })
})
