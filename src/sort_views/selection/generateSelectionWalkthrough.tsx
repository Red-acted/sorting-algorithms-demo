export type Walkthrough = {
    description: string
    cards: Card[]

    swap?: { 
        firstCard: {
            position: number,
            id: number
        }
        secondCard: {
            position: number,
            id: number
        }
     }

     smallest?: number
}

export type Card = {
    position: number,
    value: number,
}

// Gera uma demonstração completa do método Selection Sort, etapa por etapa.
function generateSelectionWalkthrough(numbers: number[]) {
    const walkthrough: Walkthrough[] = []
    const cards: Card[] = numbers.map((value, position) => ({ position, value }))

    for (let i = 0; i < numbers.length-1; i++) {
        const current = cards.find(it => it.position === i)!!

        walkthrough.push({
            description: `Lemos o número ${current.value}. Procuramos o menor valor que vem depois dele.`,
            cards: structuredClone(cards)
        })
        
        let smallest = current;
        for (let j = i+1; j < numbers.length; j++) {
            const card = cards.find(it => it.position === j)!!
            if (card.value < smallest.value) {
                smallest = card
            }
        }

        const currentPos = cards.findIndex(it => it.position === i)
        const smallestPos = cards.findIndex(it => it.position === smallest.position)

        if (smallest.position !== current.position) {
            walkthrough.push({
                description: `O menor valor que vem depois de ${current.value} é ${smallest.value}.`,
                cards: structuredClone(cards),
                smallest: smallestPos
            })
        }
        else {
            walkthrough.push({
                description: `O menor valor que vem depois de ${current.value} é ele mesmo. Logo, não é necessário trocar.`,
                cards: structuredClone(cards),
                smallest: smallestPos
            })
            continue
        }

        const aux = current.position
        current.position = smallest.position
        smallest.position = aux

        walkthrough.push({
            description: `Trocamos ${current.value} e ${smallest.value} de lugar.`,
            cards: structuredClone(cards),
            swap: {
                firstCard: {
                    id: currentPos,
                    position: aux
                },

                secondCard: {
                    id: smallestPos,
                    position: current.position
                }
            }
        })
    }

    walkthrough.push({
        description: "Finalmente, o array está em ordem.",
        cards: structuredClone(cards),
    })

    return walkthrough
}

export default generateSelectionWalkthrough