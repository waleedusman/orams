/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uniqueID } from 'shared/utils/helpers'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

import styles from './ReferralBuilder.scss'

class ReferralBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadSupplierData(this.props.id)
    console.log('ReferralBuilder props: ', this.props)
  }

  retrieveRegionName(regionCode, regionData) {
    let regionName = ''
    let subRegionName = ''
    for (const region of regionData.regions) {
      const foundSubRegion = region.subRegions.find((subRegion) => {
        return subRegion.id = regionCode
      })
      if (foundSubRegion) {
        regionName = region.name
        subRegionName = foundSubRegion.name
        break
      }
    }
    return regionName + ' ' + subRegionName
  }

  goBack = (props) => {
    this.props.history.goBack()
  }

  render() {
    const { supplierData, regionCode, regionsData, price, organisation } = this.props

    return (
      <div>
        {supplierData && regionCode && regionsData && price && organisation
          ? <div>
            <div>
              <main>
                <div className="row">
                  <div className="col-xs-12 col-sm-9">
                    <div className="au-display-xl">
                      Send Referral
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3 col-xs-12">
                    <div className={styles.title}>Supplier</div>
                  </div>
                  <div className={styles.badge}>
                    {supplierData.name}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3 col-xs-12">
                    <div className={styles.title}>Services</div>
                  </div>
                  <div className={styles.badge}>
                    {supplierData.category_name}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3 col-xs-12">
                    <div className={styles.title}>Operates in</div>
                  </div>
                  <div className={styles.badge}>
                    {this.retrieveRegionName(regionCode, regionsData)}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3 col-xs-12">
                    <div className={styles.title}>Price</div>
                  </div>
                  <div className={styles.badge}>
                   <span className={styles.priceElements}>
                     <div className={styles.price}>
                            {'$' + price + ' ' + 'inc GST'}
                            </div>
                   </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3 col-xs-12">
                    <div className={styles.title}>Buyer Organisation</div>
                  </div>
                  <div className={styles.badge}>
                    <div className={styles.price}>
                      {organisation}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3 col-xs-12">
                    <div className={styles.title}>Content</div>
                  </div>
                  <div className={styles.badge}>
                    <textarea rows="10" cols="80"></textarea>
                  </div>
                </div>


              </main>
            </div>
            <div className={styles.informationSection}>
              <main>
                <div className={styles.referral}>
                  <button className="au-btn" onClick={() => {
                    this.props.history.goBack()
                  }}
                  >Cancel
                  </button>

                </div>
              </main>
            </div>
          </div>
          : <LoadingIndicatorFullPage/>}
      </div>
    )
  }
}

ReferralBuilder.propTypes = {}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(ReferralBuilder)
