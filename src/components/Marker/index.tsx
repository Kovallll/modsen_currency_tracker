import { PureComponent } from 'react'

import * as styles from './styles.module.scss'

interface MarkerProps {
    onClick: (feature: string) => void
    feature: Feature
}

interface Feature {
    properties: { description: string; title: string }
}
export class Marker extends PureComponent<MarkerProps> {
    constructor(props: MarkerProps) {
        super(props)
    }

    handleClick = () => {
        const { onClick, feature } = this.props

        onClick(feature.properties.description)
    }

    render() {
        const { feature } = this.props

        return (
            <button onClick={this.handleClick} className={styles.marker}>
                {feature.properties.title}
            </button>
        )
    }
}
