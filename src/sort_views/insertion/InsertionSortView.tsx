import { useLayoutEffect, useRef, useState } from "react"
import generateInsertionWalkthrough, { Walkthrough } from "./generateInsertionWalkthrough"
import WalkthroughDisplay from "../WalkthroughDisplay"

import "./InsertionSortView.css"

function InsertionSortView() {
    const [walkthrough, setWalkthrough] = useState<Walkthrough[]>()
    const [step, setStep] = useState(0)
    const [previousStep, setPreviousStep] = useState(-1)
    const hoveringCard = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        // Plays animation when moving a card from a position to another
        if (!hoveringCard.current || walkthrough?.[highestStep]?.hovering?.nextPosition === undefined) return
        const { current: card } = hoveringCard

        // Force reflow
        void card.offsetWidth

        const slideDuration = "calc((var(--start) - var(--end)) * 100ms)"
        if (step > previousStep) {
            card.style.animation = `slide1 ${slideDuration} ease-in, hover1 150ms ease-in-out ${slideDuration}`
        }
        else {
            card.style.animation = `slide1 ${slideDuration} ease-in 150ms reverse, hover1 150ms ease-in-out reverse`
        }

        return () => {
            card.style.animation = ""
        }
    }, [step])

    const cardWidth = 6
    const padding = 0.75
    const totalWidth = walkthrough && (walkthrough[step].cards.length * (padding + cardWidth) - padding)
    const highestStep = Math.max(previousStep, step)

    return (
        <WalkthroughDisplay
            description={walkthrough?.[step].description ?? ""}

            previous={() => { if (step > 0) {
                setPreviousStep(step)
                setStep(step-1)
            }}}

            reset={() => setStep(0)}

            next={() => { if (walkthrough && step < walkthrough.length-1) {
                setPreviousStep(step)
                setStep(step+1)
            }}}

            create={array => {
                setPreviousStep(-1)
                setStep(0)
                setWalkthrough(generateInsertionWalkthrough(array))
            }}
        > { walkthrough &&
            <div className="relative h-36 m-4"
                style={{
                    width: `${totalWidth}rem`,
                    "--start": walkthrough[highestStep].hovering?.position,
                    "--end": walkthrough[highestStep].hovering?.nextPosition,
                    "--padding": `${padding}rem`
                } as any}
            >
                {walkthrough[step].cards.map(({ position: index, value }, pos) => {
                    const hover = walkthrough[step].hovering

                    return (
                        <div key={pos}
                            className={"absolute bg-slate-50 shadow-lg border-2 rounded-xl w-24 h-36 text-4xl flex justify-center items-center transition-all"}
                            ref={ref => {
                                const { hovering } = walkthrough[highestStep]
                                if (hovering && pos === hovering.id) hoveringCard.current = ref
                            }}
                            style={{ 
                                width: `${cardWidth}rem`,
                                translate: `calc((100% + var(--padding)) * ${index}) `
                                        +  `calc((100% + var(--padding)) * ${+( hover?.position === pos && hover?.nextPosition === undefined)}`
                            }}
                            children={value}
                        />
                    )
                })}
            </div>
        } </WalkthroughDisplay>
    )
}

export default InsertionSortView