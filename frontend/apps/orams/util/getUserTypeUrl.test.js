import expect from 'expect'
import { getUserTypeHomeUrl, getUserTypeNavLinks } from './getUserTypeUrl'

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

describe('#getUserTypeNavLinks', () => {
  describe('not logged in', () => {
    const loggedIn = false

    test('should return Sign Up and Sign In url', () => {
      const expectedLinks = [
        {
          url: '/signup',
          text: 'Sign up'
        },
        {
          url: '/login',
          text: 'Sign in'
        }
      ]

      const actualUrl = getUserTypeNavLinks(loggedIn)
      expect(actualUrl).toMatchObject(expectedLinks)
    })
  })

  describe('logged in', () => {
    const loggedIn = true

    test('should return Sign Out url when no user type', () => {
      const expectedLinks = [
        {
          url: '/logout',
          text: 'Sign out'
        }
      ]

      const actualUrl = getUserTypeNavLinks(loggedIn)
      expect(actualUrl).toMatchObject(expectedLinks)
    })

    test('should return admin navigations when user type = admin ', () => {
      const userType = 'admin'
      const expectedLinks = [
        {
          url: '/admin',
          text: 'Admin'
        },
        {
          url: '/seller-catalogue',
          text: 'Service Matrix'
        },
        {
          url: '/price-history',
          text: 'Price history'
        },
        {
          url: '/logout',
          text: 'Sign out'
        }
      ]

      const actualUrl = getUserTypeNavLinks(loggedIn, userType)
      expect(actualUrl).toMatchObject(expectedLinks)
    })

    test('should return seller-catalogue url when user type = buyer ', () => {
      const userType = 'buyer'
      const expectedLinks = [
        {
          url: '/seller-catalogue',
          text: 'Service Matrix'
        },
        {
          url: '/price-history',
          text: 'Price history'
        },
        {
          url: '/logout',
          text: 'Sign out'
        }
      ]

      const actualUrl = getUserTypeNavLinks(loggedIn, userType)
      expect(actualUrl).toMatchObject(expectedLinks)
    })

    test('should return profile url when user type = supplier ', () => {
      const userType = 'supplier'
      const expectedLinks = [
        {
          url: '/edit-profile',
          text: 'Edit Profile'
        },
        {
          url: '/logout',
          text: 'Sign out'
        }
      ]
      const actualUrl = getUserTypeNavLinks(loggedIn, userType)
      expect(actualUrl).toMatchObject(expectedLinks)
    })
  })
})
