const pageElement = {
  exitButton: '#exitButton'
}

export function clickExit() {
  cy.origin(
    'https://venda.cp.pt',
    { args: { selector: pageElement.exitButton } },
    ({ selector }) => {
      cy.get(selector).click()
    }
  )
}
