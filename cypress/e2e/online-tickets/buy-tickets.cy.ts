import { formatDate, getFutureDate } from 'cypress/support/helpers/dates'
import * as buyTicketPage from '../../support/page-objects/bookingPage'
import { ticketData } from 'cypress/data/ticketData'
import * as selectTrainPage from 'cypress/support/page-objects/selecTrainsPage'

const today = new Date()

describe('Buy Tickets Submission', () => {
  it('should sucessfully search and cancel ticket bookings', () => {
    buyTicketPage.visit()

    const departDate = getFutureDate(ticketData.jounreyDayFromToday)

    const returnDate = getFutureDate(ticketData.returnDayFromToday)

    buyTicketPage.enterTicketData(
      ticketData.from,
      ticketData.to,
      departDate,
      returnDate
    )
    buyTicketPage.submit()

    cy.intercept('POST', '/passageiros/en/buy-tickets').as('buyTicketsRequest')

    selectTrainPage.clickExit()

    cy.wait('@buyTicketsRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200) // or whatever you expect
      const responseBody = interception.response?.body
      const formattedDepartDate = formatDate(
        departDate.day,
        departDate.month,
        departDate.year
      )
      const formattedReturnDate = formatDate(
        returnDate.day,
        returnDate.month,
        returnDate.year
      )
      // Optional: assert something in the response
      expect(responseBody).to.include("arrivalEscapeXml = 'Porto Campanha'")
      expect(responseBody).to.include("departEscapeXml = 'Lagos'")
      expect(responseBody).to.include(
        `departDateEscapeXml = '${formattedDepartDate}'`
      )
      expect(responseBody).to.include(
        `returnDateEscapeXml = '${formattedReturnDate}'`
      )
    })
  })
})
