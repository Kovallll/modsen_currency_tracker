import { Component } from 'react'

import * as styles from './styles.module.scss'

import { MarkerPopupProps } from '@/types'

export class MarkerPopup extends Component<MarkerPopupProps> {
    constructor(props: MarkerPopupProps) {
        super(props)
    }
    render() {
        const { feature } = this.props
        return (
            <div className={styles.container}>
                {feature.properties.description}
            </div>
        )
    }
}
