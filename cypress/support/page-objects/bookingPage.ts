import { TicketDate } from 'cypress/models/ticketData'
import { getFutureDate } from '../helpers/dates'

const pageElement = {
  departureTextBox: 'input[name="textBoxPartida"]',
  arrivalTextBox: 'input[name="textBoxChegada"]',
  departureDatePicker: '#datepicker-first_table',
  returnDatePicker: '#datepicker-second_table',
  submitButton: 'input[type="submit"]',
  monthOnCalendar: '.picker__month',
  nextButtonDepartureCalendar:
    '.picker__nav--next[aria-controls="datepicker-first_table"]',
  nextButtonReturnCalendar:
    '.picker__nav--next[aria-controls="datepicker-second_table"]',
  dayOnCalendar: '.picker__day.picker__day--infocus'
}

const URL = 'https://www.cp.pt/passageiros/en/buy-tickets'

//ToDO - set up getter functions for page objects.
//Since I wanted to just get the code ready and working
export function visit() {
  cy.visit(URL)

  cy.location('pathname', { timeout: 60000 }).should('include', '/buy-tickets')

  cy.contains('Buy Tickets').should('exist')
}

export function selectDate(
  type: 'departure' | 'return',
  targetDay: number,
  targetMonth: string
) {
  let datePickerId: string
  let nextButton: String
  if (type === 'departure') {
    datePickerId = pageElement.departureDatePicker
    nextButton = pageElement.nextButtonDepartureCalendar
  } else {
    datePickerId = pageElement.returnDatePicker
    nextButton = pageElement.nextButtonReturnCalendar
  }
  // Click on the date picker input
  cy.get(datePickerId).click({ force: true })

  // Wait for calendar to show and match the target month
  cy.get(`${pageElement.monthOnCalendar}`)
    .first()
    .then(($month) => {
      const currentMonth = $month.text().trim()
      if (currentMonth !== targetMonth) {
        // Navigate months until target is found
        const clickNextMonth = () => {
          cy.get(`${nextButton}`).click()
          cy.get(`${pageElement.monthOnCalendar}`)
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

  cy.get(datePickerId)
    .find(pageElement.dayOnCalendar)
    .contains(targetDay)
    .click()
}

export function enterTicketData(
  from: string,
  to: string,
  journeyDate: TicketDate,
  returnDate: TicketDate
) {
  cy.get(pageElement.departureTextBox).type(from)

  cy.get(pageElement.arrivalTextBox).type(to)

  selectDate('departure', journeyDate.day, journeyDate.month)
  selectDate('return', returnDate.day, returnDate.month)
}

export function submit() {
  cy.get(pageElement.submitButton).click()
}
