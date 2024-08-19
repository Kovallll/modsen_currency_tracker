import AustDollar from '@/assets/currencyIcons/Australian Dollar Icon.svg'
import Bitcoin from '@/assets/currencyIcons/Bitcoin Icon.svg'
import Bovespa from '@/assets/currencyIcons/Bovespa Icon.svg'
import CanadDollar from '@/assets/currencyIcons/Canadian Dollar Icon.svg'
import Dollar from '@/assets/currencyIcons/Dollar Icon.svg'
import Euro from '@/assets/currencyIcons/Euro Icon.svg'
import Libra from '@/assets/currencyIcons/Libra Icon.svg'
import Peso from '@/assets/currencyIcons/Peso Argentino Icon.svg'
import Won from '@/assets/currencyIcons/Won Icon.svg'
import Yen from '@/assets/currencyIcons/Yen Icon.svg'
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
    { id: 1, title: 'General', links: ['Market', 'Service'] },
    { id: 2, title: 'Product', links: ['Sparks', 'Snaps'] },
    { id: 3, title: 'Community', links: ['Ideas', 'Streams'] },
]

export const apikey = '213AC6A9-CD29-46F8-9272-054F80F6B823'

export const responseLastUpdated =
    'https://api.currencyapi.com/v3/latest?apikey=cur_live_5KKBeFRlkcERd1QQC93qEgq1112YvvAsScAyp16M&currencies=EUR%2CUSD%2CCAD%2CAFN%2CRUB%2CBYN'

export const responseAssets = `https://rest.coinapi.io/v1/assets?apikey=${apikey}&filter_asset_id=${Currencies.AustralianDollar};${Currencies.Bitcoin};${Currencies.Bovespa};${Currencies.CanadianDollar};${Currencies.Dollar};${Currencies.Euro};${Currencies.Libra};${Currencies.Peso};${Currencies.Won};${Currencies.YEN};`

export const responseAssetRate = 'https://rest.coinapi.io/v1/exchangerate'

export const getResponseAssetRate = (assetId: Currencies) => {
    return `${responseAssetRate}/${assetId}?apikey=${apikey}&filter_asset_id=${Currencies.AustralianDollar};${Currencies.Bitcoin};${Currencies.Bovespa};${Currencies.CanadianDollar};${Currencies.Dollar};${Currencies.Euro};${Currencies.Libra};${Currencies.Peso};${Currencies.Won};${Currencies.YEN};`
}

export const getResponseTimeseriesData = (
    assetIdBase: Currencies,
    assetIdQuote: Currencies
) => {
    return `${responseAssetRate}/${assetIdBase}/${assetIdQuote}/history?apikey=${apikey}`
}

export const defaultRate = {
    asset_id_base: Currencies.Dollar,
    rates: [{ time: '', asset_id_quote: '', rate: 0 }],
}

export const defaultLastUpdate = { last_updated_at: '00' }

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
