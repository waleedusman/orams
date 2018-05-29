const DEFAULT_URL = '/'

const userTypeHomeUrlMap = {
  admin: '/admin',
  buyer: '/seller-catalogue',
  supplier: '/profile'
}

const userTypeNavLinksMap = {
  admin: [
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
    }
  ],
  buyer: [
    {
      url: '/seller-catalogue',
      text: 'Service Matrix'
    },
    {
      url: '/price-history',
      text: 'Price history'
    }
  ],
  supplier: [
    {
      url: '/edit-profile',
      text: 'Edit Profile'
    }
  ]
}

const logoutLink = {
  url: '/logout',
  text: 'Sign out'
}

export const getUserTypeHomeUrl = (loggedIn, userType) => {
  if (loggedIn && userType) {
    return userTypeHomeUrlMap[userType]
  }

  return DEFAULT_URL
}

export const getUserTypeNavLinks = (loggedIn, userType) => {
  if (loggedIn) {
    if (userType) {
      const navLinks = userTypeNavLinksMap[userType]

      return [...navLinks, logoutLink]
    }

    return [logoutLink]
  }

  return [
    {
      url: '/signup',
      text: 'Sign up'
    },
    {
      url: '/login',
      text: 'Sign in'
    }
  ]
}
