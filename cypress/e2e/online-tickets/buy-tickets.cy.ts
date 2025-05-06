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

    //There needs to be tests for automcomplete and just typing the date instead of chosing.
    //For this test, I am doing what a user wouldn't typically do. They would alway type a few letters before selecting from the automcomplete
    //Especially - Porto Campanha. No one's spelling it right.
    buyTicketPage.enterTicketData(
      ticketData.from,
      ticketData.to,
      departDate,
      returnDate
    )
    buyTicketPage.submit()

    cy.intercept('POST', '/passageiros/en/buy-tickets').as('buyTicketsRequest')

    selectTrainPage.clickExit()

    //This was the tricky bit, how do we test that the fields retain their values after user clicks cancel.
    //Well, intercept the /passageiros/en/buy-tickets call
    //and make sure certain variables are being set.
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
