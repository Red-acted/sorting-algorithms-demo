export type Walkthrough = {
    description: string,
    cards: Card[],
    hovering?: {
        id: number,
        position: number
        nextPosition?: number
    }
}

export type Card = {
    position: number,
    value: number
}

// Gera uma demonstração completa do método Insertion Sort, etapa por etapa.
function generateInsertionWalkthrough(arr: number[]) {
    const cards: Card[] = arr.map((value, position) => ({ position, value }))
    const walkthrough: Walkthrough[] = []

    walkthrough.push({
        description: "Começamos com os valores fora de ordem.",
        cards: structuredClone(cards)
    })

    walkthrough.push({
        description: `Lemos o valor ${cards[0].value}. Como ele é o primeiro, já está em seu lugar.`,
        cards: structuredClone(cards)
    })

    for (let i = 1; i < cards.length; i++) {
        const curIndex = cards.findIndex(({ position }) => position === i)!!
        const cur = cards[curIndex]
        let j = i - 1
        let checkedCard: Card = cards.find(it => it.position === j)!!

        if (checkedCard.value <= cur.value) {
            walkthrough.push({
                description: `O valor ${cur.value} já está em sua devida posição.`,
                cards: structuredClone(cards)
            })
        }

        else {
            walkthrough.push({
                description: `Lemos o valor ${cur.value}, que está fora de lugar.`,
                cards: structuredClone(cards),
                hovering: {
                    id: curIndex,
                    position: cur.position
                }
            })

            //let checkedCard: Card
            while (j >= 0 && (checkedCard = cards.find(({ position: index }) => index === j)!!).value > cur.value) {
                checkedCard.position++

                walkthrough.push({
                    description: `Como ${checkedCard.value} é maior que ${cur.value}, ele é empurrado para frente.`,
                    cards: structuredClone(cards),
                    hovering: {
                        id: curIndex,
                        position: cur.position
                    }
                })

                j--
            }

            const old = cur.position
            cur.position = j+1

            walkthrough.push({
                description: `O valor ${cur.value} é colocado em sua devida posição.`,
                cards: structuredClone(cards),
                hovering: {
                    id: curIndex,
                    position: old,
                    nextPosition: j+1
                }
            })
        }
    }

    walkthrough[walkthrough.length-1].description += "\nAgora, todos os valores estão devidamente organizados."
    return walkthrough
}

export default generateInsertionWalkthrough;