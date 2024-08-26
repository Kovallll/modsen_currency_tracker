import AustDollar from '@/assets/currencyIcons/australian-dollar.svg'
import Bitcoin from '@/assets/currencyIcons/bitcoin.svg'
import Bovespa from '@/assets/currencyIcons/bovespa.svg'
import CanadDollar from '@/assets/currencyIcons/canadian-dollar.svg'
import Dollar from '@/assets/currencyIcons/dollar.svg'
import Euro from '@/assets/currencyIcons/euro.svg'
import Libra from '@/assets/currencyIcons/libra.svg'
import Peso from '@/assets/currencyIcons/peso-argentino.svg'
import Won from '@/assets/currencyIcons/won.svg'
import Yen from '@/assets/currencyIcons/yen.svg'
import { CurrencyAssetsData } from '@/types'

export enum Currencies {
    Bitcoin = 'BTC',
    Dollar = 'USD',
    AustralianDollar = 'AUD',
    Bovespa = 'BRL',
    CanadianDollar = 'CAD',
    Euro = 'EUR',
    Libra = 'LBR',
    Peso = 'MXN',
    Won = 'KRW',
    YEN = 'JPY',
}

export const currencies = {
    [Currencies.Bitcoin]: <Bitcoin />,
    [Currencies.Dollar]: <Dollar />,
    [Currencies.AustralianDollar]: <AustDollar />,
    [Currencies.Bovespa]: <Bovespa />,
    [Currencies.CanadianDollar]: <CanadDollar />,
    [Currencies.Euro]: <Euro />,
    [Currencies.Libra]: <Libra />,
    [Currencies.Peso]: <Peso />,
    [Currencies.Won]: <Won />,
    [Currencies.YEN]: <Yen />,
}

export enum Paths {
    Home = '/',
    Timeline = '/timeline',
    BankCard = '/bankcard',
    Contacts = '#contacts',
    NotFound = '/*',
}

export const footerLinks = [
    { id: '1', title: 'General', links: ['Market', 'Service'] },
    { id: '2', title: 'Product', links: ['Sparks', 'Snaps'] },
    { id: '3', title: 'Community', links: ['Ideas', 'Streams'] },
]

export const defaultRate = {
    asset_id_base: Currencies.Dollar,
    rates: [{ time: '', asset_id_quote: '', rate: 0 }],
}

export const defaultLastUpdate = { last_updated_at: '23:59:58' }

export const defaultAllAssets: CurrencyAssetsData = {
    asset_id: Currencies.Dollar,
    title: '',
    subtitle: 0,
    priceUsd: 0,
    start: '',
    end: '',
}

export const msInDay = 86400000

export const dateNowMs = new Date().getTime()

export const yaerNow = new Date().getFullYear()

export const timeToUpdateData = 60

export const highDigit = 5

export const lowDigit = 2

export const openCloseDigit = 5

export const maxOpenClose = 6

export const initialZoom = 5.2

export const initialLat = 53.93457241600598

export const initialLng = 27.655596376281522

export const toFixedNumbers = 2

export const white = '#fff'

export const black = '#000'

export const chartBarColor = '#ff005dbe'

export const chartGridColor = '#44b92cbd'

export const mapStyle = 'mapbox://styles/mapbox/streets-v12'
