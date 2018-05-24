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
  }

  retrieveRegionName(regionCode, regionData) {
    let regionName
    let subRegionName
    for (const region of regionData.regions) {
      for (const subRegion of region.subRegions) {
        if (subRegion.id == regionCode) {
          regionName = region.name
          subRegionName = subRegion.name
          break
        }
      }
    }
    return regionName + ' ' + subRegionName
  }

  render() {
    console.log('ReferralBuilder props: ', this.props)
    const { supplierData, regionCode, regionsData } = this.props

    return (
      <div>
        {supplierData
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
                    <div className={styles.title}>Operates in </div>
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
                            {'$' + supplierData.price + ' ' + 'inc GST'}
                            </div>
                   </span>
                  </div>
                </div>


              </main>
            </div>
            <div className={styles.informationSection}>
              <main>

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
