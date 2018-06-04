const DEFAULT_URL = '/'

const userTypeHomeUrlMap = {
  admin: '/admin',
  buyer: '/seller-catalogue',
  supplier: '/profile'
}

const userTypeNavLinksMap = {
  admin: [
    {
      key: 'admin',
      url: '/admin',
      text: 'Admin'
    },
    {
      key: 'seller-catalogue',
      url: '/seller-catalogue',
      text: 'Service Matrix'
    },
    {
      key: 'price-history',
      url: '/price-history',
      text: 'Price history'
    }
  ],
  buyer: [
    {
      key: 'seller-catalogue',
      url: '/seller-catalogue',
      text: 'Service Matrix'
    },
    {
      key: 'price-history',
      url: '/price-history',
      text: 'Price history'
    }
  ],
  supplier: [
    {
      key: 'edit-profile',
      url: '/edit-profile',
      text: 'Edit Profile'
    }
  ]
}

const logoutLink = {
  key: 'logout',
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
      key: 'signup',
      url: '/signup',
      text: 'Sign up'
    },
    {
      key: 'login',
      url: '/login',
      text: 'Sign in'
    }
  ]
}
