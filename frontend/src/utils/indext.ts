export function queryElement(query: string){
    const element = document.querySelector(query)

    if(!element) throw Error(`${query} not found`)

    return element
}

export function queryElements(query: string){
    const elements = document.querySelectorAll(query)

    if(!elements) throw Error(`${query} not found`)

    return elements
}