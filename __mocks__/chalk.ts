function makeCh(...args: string[][]) {
    const ch = jest.fn(
        (text: string) =>
            args.reduce((previousValue, currentValue) => `[${currentValue.join(',')}](${previousValue})`, text)
    )


    Object.defineProperty(ch, 'hex', {
        get: () => ((hex: string) => makeCh(['hex', hex], ...args))
    })

    Object.defineProperty(ch, 'bgHex', {
        get: () => ((hex: string) => makeCh(['bgHex', hex], ...args))
    })

    Object.defineProperty(ch, 'bold', {
        get: () => makeCh(['bold'], ...args)
    })

    return ch;
}

const ch = makeCh();

export default ch;
