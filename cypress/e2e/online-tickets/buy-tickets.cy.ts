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

    cy.get('input[name="textBoxChegada"]').type('Porto Campanha')

    //date picker. Picking off UI but need test for the typing as well.,
    // Get date 3 days from today
    const dateIn3Days = getFutureDate(3)
    cy.log(`Date in 3 days: ${dateIn3Days.day} ${dateIn3Days.month}`)

    // Get date 5 days from today
    const dateIn5Days = getFutureDate(5)
    cy.log(`Date in 5 days: ${dateIn5Days.day} ${dateIn5Days.month}`)

    //
    selectDate1('datepicker-first', dateIn3Days.day, dateIn3Days.month)
    //selectDate2('datepicker-second', dateIn5Days.day, dateIn5Days.month)
    selectDate2('datepicker-second', 24, 'June')

    // cy.get(`#datepicker-first`).click({ force: true })
    // cy.get('.picker__nav--next[aria-controls="datepicker-first_table"]').click()
    cy.get('input[type="submit"]').click()

    cy.origin('https://venda.cp.pt', () => {
      // All Cypress commands targeting venda.cp.pt go here
      cy.get('#exitButton').click()
      // You can continue the booking flow here...
    })

    cy.wait(9000)
    cy.window().then((win) => {
      // Access the page's window object
      // Evaluate the JavaScript code to get the variable's value
      const departValue = win.eval('departEscapeXml')
      expect(departValue).to.equal('Lagos')
    })
  })
})

function getFutureDate(daysFromToday: number): { day: number; month: string } {
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(today.getDate() + daysFromToday)

  const day = futureDate.getDate()
  const month = futureDate.toLocaleString('default', { month: 'long' }) // e.g., "May"

  return { day, month }
}

function selectDate1(
  datePickerId: string,
  targetDay: number,
  targetMonth: string
) {
  // Click on the date picker input
  cy.get(`#${datePickerId}`).click({ force: true })

  // Wait for calendar to show and match the target month
  cy.get('.picker__month')
    .first()
    .then(($month) => {
      const currentMonth = $month.text().trim()
      cy.log(currentMonth)
      cy.log(targetMonth)
      if (currentMonth !== targetMonth) {
        // Navigate months until target is found
        const clickNextMonth = () => {
          cy.get(
            '.picker__nav--next[aria-controls="datepicker-first_table"]'
          ).click()
          cy.get('.picker__month')
            .invoke('text')
            .then((newMonth) => {
              if (newMonth.trim() !== targetMonth) {
                clickNextMonth()
              }
            })
        }
        clickNextMonth()
      }
    })

  // Select the target day (must happen after calendar loads)
  cy.get('#datepicker-first_table') // Target the specific journey date picker
    .find('.picker__day.picker__day--infocus') // Find the in-focus days within that picker
    .contains(targetDay)
    .click()
}

function selectDate2(
  datePickerId: string,
  targetDay: number,
  targetMonth: string
) {
  // Click on the date picker input
  cy.get(`#${datePickerId}`).click({ force: true })

  // Wait for calendar to show and match the target month
  cy.get('.picker__month')
    .eq(1)
    .then(($month) => {
      const currentMonth = $month.text().trim()
      cy.log(currentMonth)
      cy.log(targetMonth)
      if (currentMonth !== targetMonth) {
        // Navigate months until target is found
        const clickNextMonth = () => {
          cy.get(
            '.picker__nav--next[aria-controls="datepicker-second_table"]'
          ).click()
          cy.get('.picker__month')
            .eq(1)
            .invoke('text')
            .then((newMonth) => {
              if (newMonth.trim() !== targetMonth) {
                clickNextMonth()
              }
            })
        }
        clickNextMonth()
      }
    })

  //Select the target day (must happen after calendar loads)
  cy.get('#datepicker-second_table') // Target the specific journey date picker
    .find('.picker__day.picker__day--infocus') // Find the in-focus days within that picker
    .contains(targetDay)
    .click()
}
