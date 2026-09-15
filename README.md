# Cypress Playground

End-to-end tests for online casino game sites, written with [Cypress](https://www.cypress.io/).

The tests cover the full flow a real player goes through: dismissing cookie and age-verification overlays, opening a specific game, and interacting with controls rendered inside the game client — which, on these sites, lives several iframes deep.

## Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (ships with Node)

## Setup

```bash
git clone <your-repo-url>
cd cypress-playground
npm install
```

`npm install` pulls in Cypress and the plugins listed below. The first install also downloads the Cypress binary (~200 MB) into a shared local cache, so later projects on the same machine reuse it.

Verify the binary landed correctly:

```bash
npx cypress verify
```

## Running tests

Open the interactive Test Runner:

```bash
npx cypress open
```

Run everything headlessly:

```bash
npx cypress run
```

Run a single spec:

```bash
npx cypress run --spec "cypress/e2e/ui-evolution-test.cy.js"
```

## Project structure

```
cypress/
  e2e/                        # test specs
    ui-evolution-test.cy.js
    ui-components.cy.js
  support/
    commands.js               # custom commands
    e2e.js                    # loads commands + plugins before every spec
  fixtures/                   # static test data
cypress.config.js             # global config
```

## Plugins

| Plugin | Why it's here |
| --- | --- |
| `cypress-iframe` | Adds `cy.frameLoaded()` and `cy.iframe()` for working with a single iframe. |
| `cypress-real-events` | Fires native (trusted) events via the Chrome DevTools Protocol. Needed where simulated clicks are ignored — see below. |

Both are registered in `cypress/support/e2e.js`.