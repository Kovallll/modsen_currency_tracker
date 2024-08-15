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
    Contacts = '/#contacts',
    NotFound = '/*',
}

export const footerLinks = [
    { id: 1, title: 'General', links: ['Market', 'Service'] },
    { id: 2, title: 'Product', links: ['Sparks', 'Snaps'] },
    { id: 3, title: 'Community', links: ['Ideas', 'Streams'] },
]

export const mockRate = {
    asset_id_base: 'BTC',
    rates: [
        {
            time: '2017-08-09T14:31:37.0520000Z',
            asset_id_quote: 'USD',
            rate: 3258.887541779804,
        },
        {
            time: '2017-08-09T14:31:36.7570000Z',
            asset_id_quote: 'EUR',
            rate: 2782.5255080599272,
        },
        {
            time: '2017-08-09T14:31:36.7570000Z',
            asset_id_quote: 'CNY',
            rate: 21756.295595926054,
        },
        {
            time: '2017-08-09T14:31:36.7570000Z',
            asset_id_quote: 'GBP',
            rate: 2509.602420379958,
        },
    ],
}

export const mockData = [
    {
        asset_id: Currencies.Bitcoin,
        name: 'Bitcoin',
        type_is_crypto: 1,
        data_quote_start: '2014-02-24T17:43:05.0000000Z',
        data_quote_end: '2019-11-03T17:55:07.6724523Z',
        data_orderbook_start: '2014-02-24T17:43:05.0000000Z',
        data_orderbook_end: '2019-11-03T17:55:17.8592413Z',
        data_trade_start: '2010-07-17T23:09:17.0000000Z',
        data_trade_end: '2019-11-03T17:55:11.8220000Z',
        data_symbols_count: 22711,
        volume_1hrs_usd: 102894431436.49,
        volume_1day_usd: 2086392323256.16,
        volume_1mth_usd: 57929168359984.54,
        price_usd: 9166.207274778093,
        chain_addresses: [
            {
                chain_id: 'ARBITRUM',
                network_id: 'MAINNET',
                address: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
            },
            {
                chain_id: 'ETHEREUM',
                network_id: 'MAINNET',
                address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            },
        ],
        data_start: '2010-07-17',
        data_end: '2019-11-03',
    },
    {
        asset_id: Currencies.Dollar,
        name: 'US Dollar',
        type_is_crypto: 0,
        data_quote_start: '2014-02-24T17:43:05.0000000Z',
        data_quote_end: '2019-11-03T17:54:49.3807706Z',
        data_orderbook_start: '2014-02-24T17:43:05.0000000Z',
        data_orderbook_end: '2019-11-03T17:55:13.1863931Z',
        data_trade_start: '2010-07-17T23:09:17.0000000Z',
        data_trade_end: '2019-11-03T17:55:07.7870000Z',
        data_symbols_count: 10728,
        volume_1hrs_usd: 9466454016.52,
        volume_1day_usd: 221580758173.49,
        volume_1mth_usd: 11816685174661.7,
        price_usd: 1,
        chain_addresses: [
            {
                chain_id: 'ETHEREUM',
                network_id: 'MAINNET',
                address: '0xd233d1f6fd11640081abb8db125f722b5dc729dc',
            },
        ],
        data_start: '2010-07-17',
        data_end: '2019-11-03',
    },
]

export const mockAssets = [
    ...mockData,
    ...mockData,
    ...mockData,
    ...mockData,
    ...mockData,
]

export const apikey1 = '213AC6A9-CD29-46F8-9272-054F80F6B823'

export const apikey2 = 'C82E70D6-0D65-4477-BBC4-6AC0B2D89CE0'

export const apikey3 = '1247E454-D040-4763-91E9-0F333980CA85'
export const apikey = ' A1477A80-2274-4643-9A60-70DDF111D918'

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
    name: '',
    data_symbols_count: 0,
    price_usd: 0,
    data_start: '',
    data_end: '',
}

export const msInDay = 86400000
