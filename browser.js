import { browser } from 'k6/browser'
import { check } from 'k6'

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
}

export default async function () {
  const page = await browser.newPage()

  await page.goto('http://localhost:8000/public/crocodiles/')

  const headerText = await page.locator('h1').textContent()

  check(headerText, {
    'check page header': (text) => text === 'Public Crocodiles',
  })
  await page.close()
}
