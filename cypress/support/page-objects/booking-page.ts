const pageElement = {
  departureTextBox: 'input[name="textBoxPartida"]',
  arrivalTextBox: 'input[name="textBoxChegada"]',
  departureDatePicker: 'datepicker-first',
  returnDatePicker: 'datepicker-second',
  submitButton: 'input[type="submit"][value="Submit »"]',
  monthOnCalendar: '.picker__month',
  nextButtonDepartureCalendar:
    '.picker__nav--next[aria-controls="datepicker-first_table"]',
  nextButtonReturnCalendar:
    '.picker__nav--next[aria-controls="datepicker-second_table"]',
  dayOnCalendar: '.picker__day'
}
function selectDate1w(
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
  cy.get(`.picker__day`).contains(targetDay).click()
}

function selectDate2w(
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
