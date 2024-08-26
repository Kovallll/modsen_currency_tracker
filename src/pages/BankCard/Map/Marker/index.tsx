import { PureComponent } from 'react'

import { MarkerPopup } from './MarkerPopup'
import * as styles from './styles.module.scss'

import { MarkerProps, MarkerState } from '@/types'

export class Marker extends PureComponent<MarkerProps, MarkerState> {
    constructor(props: MarkerProps) {
        super(props)
        this.state = {
            isHover: false,
        }
    }

    handleMarkerHover = () => {
        this.setState({ isHover: true })
    }

    handleMarkerUnhover = () => {
        this.setState({ isHover: false })
    }

    render() {
        const { feature } = this.props
        const { isHover } = this.state

        return (
            <>
                {isHover && <MarkerPopup feature={feature} />}
                <button
                    onMouseOver={this.handleMarkerHover}
                    onMouseLeave={this.handleMarkerUnhover}
                    className={styles.marker}
                >
                    {feature.properties.title}
                </button>
            </>
        )
    }
}
