const today = new Date()

describe('Buy Tickets Submission', () => {
  it('should sucessfully search and cancel ticket bookings', () => {
    cy.visit('https://www.cp.pt/passageiros/en/buy-tickets')

    // Verify that the page has loaded by checking for a known element or text
    //Why the timeout?
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/buy-tickets'
    )

    //
    cy.contains('Buy Tickets').should('exist')

    //need test for autocomplete
    cy.get('input[name="textBoxPartida"]').type('Lagos')

    cy.get('input[name="textBoxChegada"]').type('Porto - Campanha')
  })
})

const addDays = (date: string | number | Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
