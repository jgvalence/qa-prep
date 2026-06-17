// Makes jest-dom matchers available in every test (toBeInTheDocument, toBeVisible, etc.)
import '@testing-library/jest-dom'

// jsdom doesn't ship TextEncoder/TextDecoder — React Router needs them
import { TextEncoder, TextDecoder } from 'util'
Object.assign(global, { TextEncoder, TextDecoder })
