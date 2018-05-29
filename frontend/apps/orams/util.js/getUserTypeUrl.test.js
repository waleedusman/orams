import expect from 'expect'
import { getUserTypeHomeUrl, getUserTypeSecondaryUrl } from './getUserTypeUrl'

describe('#getUserTypeHomeUrl', () => {
  describe('not logged in', () => {
    const loggedIn = false

    test('should return `/` url', () => {
      const actualUrl = getUserTypeHomeUrl(loggedIn)
      expect(actualUrl).toBe('/')
    })
  })

  describe('logged in', () => {
    const loggedIn = true

    test('should return `/` url when no user type', () => {
      const actualUrl = getUserTypeHomeUrl(loggedIn)
      expect(actualUrl).toBe('/')
    })

    test('should return admin url when user type = admin ', () => {
      const userType = 'admin'
      const actualUrl = getUserTypeHomeUrl(loggedIn, userType)
      expect(actualUrl).toBe('/admin')
    })

    test('should return seller-catalogue url when user type = buyer ', () => {
      const userType = 'buyer'
      const actualUrl = getUserTypeHomeUrl(loggedIn, userType)
      expect(actualUrl).toBe('/seller-catalogue')
    })

    test('should return profile url when user type = supplier ', () => {
      const userType = 'supplier'
      const actualUrl = getUserTypeHomeUrl(loggedIn, userType)
      expect(actualUrl).toBe('/profile')
    })
  })
})

describe('#getUserTypeSecondaryUrl', () => {
  describe('not logged in', () => {
    const loggedIn = false

    test('should return `/` url', () => {
      const actualUrl = getUserTypeSecondaryUrl(loggedIn)
      expect(actualUrl).toBe('/')
    })
  })

  describe('logged in', () => {
    const loggedIn = true

    test('should return `/` url when no user type', () => {
      const actualUrl = getUserTypeSecondaryUrl(loggedIn)
      expect(actualUrl).toBe('/')
    })

    test('should return admin url when user type = admin ', () => {
      const userType = 'admin'
      const actualUrl = getUserTypeSecondaryUrl(loggedIn, userType)
      expect(actualUrl).toBe('/admin')
    })

    test('should return seller-catalogue url when user type = buyer ', () => {
      const userType = 'buyer'
      const actualUrl = getUserTypeSecondaryUrl(loggedIn, userType)
      expect(actualUrl).toBe('/seller-catalogue')
    })

    test('should return profile url when user type = supplier ', () => {
      const userType = 'supplier'
      const actualUrl = getUserTypeSecondaryUrl(loggedIn, userType)
      expect(actualUrl).toBe('/edit-profile')
    })
  })
})
