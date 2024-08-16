import { PureComponent } from 'react'

import * as styles from './styles.module.scss'

interface MarkerProps {
    onClick: (feature: string) => void
    children?: React.ReactNode
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
        this.props.onClick(this.props.feature.properties.description)
    }

    render() {
        const { feature, children } = this.props
        return (
            <button onClick={this.handleClick} className={styles.marker}>
                {feature.properties.title}
                {children}
            </button>
        )
    }
}
