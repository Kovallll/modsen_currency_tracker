export class Observer {
    private observers: Function[]
    constructor() {
        this.observers = []
    }

    subscribe = (fn: Function) => {
        this.observers.push(fn)
    }

    unsubscribe = (fn: Function) => {
        this.observers = this.observers.filter(
            (subscriber) => subscriber !== fn
        )
    }

    broadcast = () => {
        this.observers.forEach((subscriber) => subscriber())
    }
}
