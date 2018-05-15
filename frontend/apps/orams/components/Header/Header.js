/* eslint-disable */
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from 'orams/components/Header/Header.scss'

class Header extends Component {
  render() {
    const { userType, loggedIn } = this.props

    const home = () => {
      if (loggedIn && userType === 'buyer') {
        return '/seller-catalogue'
      } else if (loggedIn && userType === 'supplier') {
        return '/profile'
      } else {
        return '/'
      }
    }

    const secondaryLink = () => {
      if (loggedIn && userType === 'buyer') {
        return <Link to={`/seller-catalogue`}>Service Matrix</Link>
      } else if (loggedIn && userType === 'supplier') {
        return <Link to={`/edit-profile`}>Edit Profile</Link>
      } else {
        return <Link to={`/signup`}>Sign up</Link>
      }
    }

    return (
      <div>
        <section
          className={`${!loggedIn && location.pathname === '/'
            ? styles.homepageMarketplaceHeader
            : ''} ${styles.marketplaceHeader} `}
        >
          <div className={styles.wrapper}>
            <div className={styles.oramsLogo}>
              <a href={home()} title="Go to the ORAMS homepage" className={styles.logo}>
                <span>ORAMS</span>
              </a>
              {location.pathname === '/' &&
                <div className={styles.subtitle}>Occupational Rehabilitation and Associated Medical Services</div>}
            </div>
            <div className={styles.userNav}>
              <div id="react-bundle-auth-header">
                <ul data-reactroot="" id="main-navigation" className={styles.inlineLinks}>
                  <li>
                    <a href="mailto:orams@ato.gov.au">Contact</a>
                  </li>
                  <li>
                    {secondaryLink()}
                  </li>
                  {loggedIn && userType == 'buyer'
                    ? <li>
                        <Link to={`/price-history`}>Price history</Link>
                      </li>
                    : ''}
                  <li>
                    {loggedIn
                      ? <Link to={`/logout`}>Sign out</Link>
                      : <Link to={`/login`}>Sign in</Link>}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userType: PropTypes.string
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  userType: state.app.userType
})

export default withRouter(connect(mapStateToProps)(Header))
