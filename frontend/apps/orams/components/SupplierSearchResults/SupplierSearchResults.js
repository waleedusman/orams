import React from 'react'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import { uniqueID } from 'shared/utils/helpers'
import styles from './SupplierSearchResults.scss'

const renderTable = suppliers => {
  if (suppliers && suppliers.length > 0) {
    return (
      <article role="main">
        <div className={styles.headingRow}>
          <div className="row">
            <div className="col-md-4 col-sm-4">Name</div>
            <div className="col-md-4 col-sm-4">Update ceiling prices</div>
            <div className="col-md-4 col-sm-4">Edit regions/service</div>
          </div>
        </div>
        {suppliers.map((supplier, id = uniqueID()) =>
          <div key={id} className={styles.supplierRow}>
            <div className="row supplier">
              <div className="col-md-4 col-sm-4 supplier-name">
                {supplier.name}
              </div>
              <div className="col-md-4 col-sm-4 link">Update prices</div>
              <div className="col-md-4 col-sm-4 link">Edit services and regions</div>
            </div>
          </div>
        )}
      </article>
    )
  }

  return (
    <AUpageAlert as="info">
      <h4>There were no suppliers found for your search</h4>
    </AUpageAlert>
  )
}

const SupplierSearchResults = props => {
  const { searchResults } = props
  const { suppliers } = searchResults || {}

  return (
    <div className={styles.container}>
      {renderTable(suppliers)}
    </div>
  )
}

export default SupplierSearchResults
