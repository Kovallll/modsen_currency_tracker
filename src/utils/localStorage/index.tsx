export class LocalStorage {
    getItem = (key: string, undefinedItem: object | null | [] = null) => {
        return JSON.parse(
            window.localStorage.getItem(key) ?? JSON.stringify(undefinedItem)
        )
    }

    setItem = (key: string, value: any) => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
}
