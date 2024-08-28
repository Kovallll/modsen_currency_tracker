import { title } from './config'
import * as styles from './styles.module.scss'

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
        </div>
    )
}

export default NotFound
