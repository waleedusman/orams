/* eslint-disable */
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUserTypeHomeUrl, getUserTypeNavLinks } from '../../util/getUserTypeUrl'

import styles from 'orams/components/Header/Header.scss'

class Header extends Component {
  render() {
    const { userType, loggedIn } = this.props

    const home = () => {
      const homeUrl = getUserTypeHomeUrl(loggedIn, userType)
      return homeUrl;
    }

    const navigationLinks = () => {
      const navLinks = getUserTypeNavLinks(loggedIn, userType) || []
      if (navLinks && navLinks.length) {
        return navLinks.map((navLink) => {
          const { key, url, text } = navLink
          return (
            <li key={key}>
              <Link to={`${url}`}>{`${text}`}</Link>
            </li>
          )
        })
      }

      return ''
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
                  {navigationLinks()}
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
