export type Walkthrough = {
    cycle: number,
    description: string,
    cards: Card[]
}

export type Card = {
    index: number,
    value: number
}

function generateBubbleWalkthrough(numbers: number[]) {
    const walkthrough: Walkthrough[] = []
    const cards: Card[] = numbers.map((value, index) => ({ value, index }))

    for (let cycle = 1; cycle < cards.length; cycle++) {
        const outOfOrder = cards.length-cycle

        walkthrough.push({
            cycle,
            description: `Começamos o ${cycle}° ciclo de ordenação, onde inserimos os valores fora de ordem (os ${outOfOrder+1} primeiros) em seus respectivos lugares.`,
            cards: structuredClone(cards)
        })

        for (let i = 0; i < cards.length-cycle; i++) {
            const cur = cards.find(it => it.index === i)!!
            const next = cards.find(it => it.index === i+1)!!

            const { value: n1 } = cards.find(it => it.index === i)!!
            const { value: n2 } = next

            if (n1 > n2) {
                const aux = cur.index
                cur.index = next.index
                next.index = aux

                walkthrough.push({
                    cycle,
                    description: `Como ${n1} é maior que ${n2}, trocamos eles de posição.`,
                    cards: structuredClone(cards)
                })
            }
            else {
                walkthrough.push({
                    cycle,
                    description: `Como ${n1} não é maior que ${n2}, não trocamos eles de posição.`,
                    cards: structuredClone(cards)
                })
            }
        }

        if (cycle === 1) {
            walkthrough.push({ 
                cycle,
                description: `Como ${cards.find(it => it.index === cards.length-1)!!.value} não tem sucessor, não precisamos compará-lo com ninguém.`,
                cards: structuredClone(cards)
            })
        }
        else {
            const current = cards.find(it => it.index === cards.length-cycle)?.value
            const next = cards.find(it => it.index === cards.length-cycle+1)?.value

            walkthrough.push({
                cycle,
                description: `Observe que não precisamos trocar ${current} e ${next} de posição, pois o ciclo anterior já colocou ${next} na sua posição correta.`,
                cards: structuredClone(cards)
            })
        }
    }

    walkthrough.push({
        cycle: cards.length-1,
        description: "Finalmente, o array está em ordem.",
        cards: structuredClone(cards),
    })

    return walkthrough
}

export default generateBubbleWalkthrough;