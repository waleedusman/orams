import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'

class SupplierSearchForm extends Component {
  static propTypes = {
    handleSearchSubmit: PropTypes.func.isRequired
  }

  handleSubmit(data) {
    const { supplierSearchTerm } = data
    const { handleSearchSubmit } = this.props
    handleSearchSubmit(supplierSearchTerm)
  }

  render() {
    const { model } = this.props

    return (
      <div>
        <Form model={model} id="supplierSearch" action="" onSubmit={data => this.handleSubmit(data)}>
          <Textfield
            model={`${model}.supplierSearchTerm`}
            name="supplierSearchTerm"
            id="supplierSearchTerm"
            htmlFor="supplierSearchTerm"
            label="Find suppliers by name prefix or email"
            description="e.g. searching for c would give all suppliers starting with c"
          />
          <button type="submit" className="au-btn">
            Search
          </button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, 'supplierSearchForm')
})

export { Textfield, mapStateToProps, SupplierSearchForm as Form }

export default connect(mapStateToProps)(SupplierSearchForm)
