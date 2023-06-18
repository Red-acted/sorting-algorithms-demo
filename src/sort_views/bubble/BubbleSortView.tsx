import { Fragment, useState } from "react"
import generateBubbleWalkthrough, { Walkthrough } from "./generateBubbleWalkthrough"
import WalkthroughDisplay from "../WalkthroughDisplay"

function BubbleSortView() {
    const [walkthrough, setWalkthrough] = useState<Walkthrough[]>()
    const [step, setStep] = useState<number>(0)

    const cardWidth = 6
    const padding = 0.75
    const totalWidth = walkthrough && (walkthrough[step].cards.length * (padding + cardWidth) - padding)

    return (
        <WalkthroughDisplay
            description={walkthrough?.[step]?.description ?? ""}
            previous={() => step > 0 && setStep(step-1)}
            reset={() => setStep(0)}
            next={() => walkthrough && step < walkthrough.length-1 && setStep(step+1)}
            create={array => {
                setStep(0)
                setWalkthrough(generateBubbleWalkthrough(array))
            }}
        > { walkthrough &&
                <div className="flex justify-center m-4">
                    <div className="relative" style={{ width: `${totalWidth}rem`, height: `${cardWidth*1.5}rem` }}>
                        {walkthrough[step].cards.map(({ index, value }, pos, { length }) => {
                            return (
                                <Fragment key={pos}>
                                    <div
                                        style={{ 
                                            width: `${cardWidth}rem`,
                                            height: `${cardWidth*1.5}rem`,
                                            translate: `calc((100% + 0.75rem) * ${index})` 
                                        }}
                                        className={"transition-all absolute bg-slate-50 shadow-lg border-2 rounded-xl text-4xl flex justify-center items-center"}
                                        children={value}
                                    />

                                    {index <= (length - walkthrough[step].cycle) && (
                                        <hr 
                                            color="#4ade80"
                                            style={{ translate: `calc(${index}*(100%) - ${padding/2}rem)` }}
                                            className={`absolute -bottom-8 w-[${cardWidth+padding}rem] h-3`} 
                                        />
                                    )}
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
        } </WalkthroughDisplay>
    )
}

export default BubbleSortView