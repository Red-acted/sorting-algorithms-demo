import { useLayoutEffect, useRef, useState } from "react"
import generateSelectionWalkthrough, { Walkthrough } from "./generateSelectionWalkthrough"
import WalkthroughDisplay from "../WalkthroughDisplay"

import "./SelectionSortView.css"

function SelectionSortView() {
    const [walkthrough, setWalkthrough] = useState<Walkthrough[]>()
    const [previousStep, setPreviousStep] = useState(-1)
    const [step, setStep] = useState(0)

    const hoverCard1 = useRef<HTMLDivElement | null>(null)
    const hoverCard2 = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        if (!hoverCard1.current || !hoverCard2.current) return

        const { current: c1 } = hoverCard1
        const { current: c2 } = hoverCard2

        // Force reflow
        void c1.offsetWidth
        void c2.offsetWidth

        const slideDuration = "calc((var(--end) - var(--start)) * 100ms)"

        if (step > previousStep) {
            c1.style.animation = `hover 150ms ease-in, slide ${slideDuration} ease-in-out 150ms, fit 150ms ease-out calc(${slideDuration} + 150ms)`
            c2.style.animation = `hover 150ms ease-in calc(${slideDuration} + 150ms) reverse, slide ${slideDuration} ease-in-out 150ms reverse, fit 150ms ease-out reverse`
        }
        else {
            c2.style.animation = `hover 150ms ease-in, slide ${slideDuration} ease-in-out 150ms, fit 150ms ease-out calc(${slideDuration} + 150ms)`
            c1.style.animation = `hover 150ms ease-in calc(${slideDuration} + 150ms) reverse, slide ${slideDuration} ease-in-out 150ms reverse, fit 150ms ease-out reverse`
        }

        return () => {
            c1.style.animation = ""
            c2.style.animation = ""
        }
    }, [step])

    const cardWidth = 6
    const padding = 0.75
    const totalWidth = walkthrough && walkthrough[step].cards.length * (padding + cardWidth) - padding
    const highestStep = Math.max(step, previousStep)

    return (
        <WalkthroughDisplay
            description={walkthrough?.[step]?.description ?? ""}

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
                setWalkthrough(generateSelectionWalkthrough(array))
            }}
        >
            <div
                className="relative m-4"
                style={{
                    "--start": walkthrough?.[highestStep]?.swap?.firstCard?.position,
                    "--end": walkthrough?.[highestStep]?.swap?.secondCard?.position,
                    "--padding": `${padding}rem`,
                    height: `${cardWidth*1.5}rem`,
                    width: `${totalWidth ?? 0}rem`,
                } as any}
            >
                {walkthrough && walkthrough[step].cards.map(({ position, value }, id) => {
                    return (
                        <div
                            key={id}

                            ref={ref => {
                                const swap = walkthrough?.[highestStep]?.swap
                                if (!swap || swap.secondCard.position - swap.firstCard.position === 1) return

                                if (id === swap.firstCard.id) {
                                    hoverCard1.current = ref
                                }

                                else if (id === swap.secondCard.id) {
                                    hoverCard2.current = ref
                                }
                            }}

                            style={{
                                translate: `calc(${position} * (100% + ${padding}rem))`,
                                width: `${cardWidth}rem`,
                                height: `${cardWidth*1.5}rem`
                            }}

                            className={
                                "transition-all absolute bg-slate-50 shadow-lg border-2 rounded-xl text-4xl flex justify-center items-center "
                                + (walkthrough[step].smallest === id ? "ring-green-400 ring-4" : "")
                            }

                            children={value}
                        />
                    )
                })}
            </div>
        </WalkthroughDisplay>
    )
}

export default SelectionSortView;