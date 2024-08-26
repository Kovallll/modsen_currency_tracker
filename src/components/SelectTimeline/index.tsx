import { PureComponent, ReactNode } from 'react'

import * as styles from './styles.module.scss'

import { SelectTimelineProps } from '@/types'

export class SelectTimeline extends PureComponent<SelectTimelineProps> {
    constructor(props: SelectTimelineProps) {
        super(props)
    }

    render(): ReactNode {
        const { selectRef, handleUpdateCurrency, assets, ...props } = this.props

        const { assetsData, loading, error } = assets

        if (error) {
            return <div className={styles.select}>Error</div>
        }
        return (
            <select
                {...props}
                className={styles.select}
                ref={selectRef}
                onChange={handleUpdateCurrency}
                data-cy="select"
            >
                <>
                    {loading ? (
                        <option>Loading...</option>
                    ) : (
                        assetsData.map((currency) => (
                            <option
                                key={currency.asset_id}
                                value={currency.asset_id}
                            >
                                {currency.title}
                            </option>
                        ))
                    )}
                </>
            </select>
        )
    }
}
