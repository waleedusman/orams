import React from 'react'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const HomePageContainer = () => {
  // const { match } = props
  return (
    <div>
      <main>
        <div className="row">
          <div className="col-xs-12">
            <span />
            <h2 className="au-display-lg">Admin</h2>
            <p>Tasks you can do here are shown below</p>
          </div>
        </div>
      </main>
    </div>
  )
}

// HomePageContainer.propTypes = {
//   match: PropTypes.object.isRequired
// }

export default withRouter(HomePageContainer)
