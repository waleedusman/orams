/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'

class AdminPage extends Component {

  render() {
    // const { match } = this.props

    return (
      <main>
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            <div className="au-display-xl">Search</div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3 col-xs-12">
            <div>
              <div>Search User By Email</div>
            </div>
            <div>
              <input
                type="search"
                id="searchUser"
                name="string"
                size="50"
                placeholder="Search user like john@ato.gov.au or just john"
              />
              <button className="au-btn">
                Search
              </button>
            </div>
          </div>

          <div className="col-sm-8 col-xs-12 col-sm-push-1">results table
          </div>
        </div>
      </main>
    )
  }
}

AdminPage.propTypes = {
  // match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPage))
