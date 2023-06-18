import { ReactNode, useState } from "react"

type WalkthroughDisplayProps = {
    // Description shown to user
    description: string

    // Navigation buttons
    previous: () => any
    next: () => any
    reset: () => any

    // Create button
    create: (array: number[]) => any

    children: ReactNode
}

function WalkthroughDisplay({ description, previous, next, create, reset, children }: WalkthroughDisplayProps) {
    const [input, setInput] = useState("")

    return (
        <div className="flex flex-col items-center">
            <div className="w-1/2 max-w-lg gap-2 flex justify-center items-baseline">
                <label>Array: </label>
                <input
                    className="flex-grow p-1 shadow-sm border-2 border-slate-300 rounded-lg m-3"
                    type="text"
                    placeholder="Números separados por vírgulas"
                    onChange={({ target }) => setInput(target.value)}
                />
                <button className="button-primary" onClick={() => {
                    const arr = []

                    for (const num of input.replace(/ /g, "").split(",")) {
                        const value = parseInt(num)
                        if (isNaN(value)) {
                            alert("Array inválido!")
                            return
                        }
                        arr.push(value)
                    }

                    if (arr.length > 20) {
                        alert("Insira um vetor com 20 itens ou menos!")
                        return
                    }
                    create(arr)
                }}>
                    Criar
                </button>
            </div>

            <div className="grid grid-cols-[repeat(3,min-content)] justify-center place-items-center gap-3">
                <textarea readOnly value={description} className="resize-none p-2 w-[50vw] max-w-lg h-24 shadow-sm border-2 border-slate-300 rounded-lg col-span-full" />
                <button className="button-primary" onClick={() => previous()}>Voltar</button>
                <button className="button-primary" onClick={() => reset()}>Resetar</button>
                <button className="button-primary" onClick={() => next()}>Próximo</button>
            </div>

            {children}
        </div>
    );
}

export default WalkthroughDisplay