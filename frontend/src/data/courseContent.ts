// Vite ?raw imports — each markdown file is loaded as a plain string
import mod01 from '../../../doc/cours/01-bases-qa.md?raw'
import mod02 from '../../../doc/cours/02-tests-manuels.md?raw'
import mod03 from '../../../doc/cours/03-jest.md?raw'
import mod04 from '../../../doc/cours/04-playwright.md?raw'
import mod05 from '../../../doc/cours/05-api-testing.md?raw'
import mod06 from '../../../doc/cours/06-mise-en-production.md?raw'

export const courseContent: Record<number, string> = {
  1: mod01,
  2: mod02,
  3: mod03,
  4: mod04,
  5: mod05,
  6: mod06,
}
