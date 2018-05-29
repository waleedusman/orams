const userTypeHomeUrlMap = {
  admin: '/admin',
  buyer: '/seller-catalogue',
  supplier: '/profile'
}

const userTypeSecondaryUrlMap = {
  admin: '/admin',
  buyer: '/seller-catalogue',
  supplier: '/edit-profile'
}

const getUserTypeUrl = (userTypeMap, loggedIn, userType) => {
  if (loggedIn && userType && userTypeMap) {
    return userTypeMap[userType]
  }

  return '/'
}

export const getUserTypeHomeUrl = (loggedIn, userType) => {
  const url = getUserTypeUrl(userTypeHomeUrlMap, loggedIn, userType)
  return url
}

export const getUserTypeSecondaryUrl = (loggedIn, userType) => {
  const url = getUserTypeUrl(userTypeSecondaryUrlMap, loggedIn, userType)
  return url
}
