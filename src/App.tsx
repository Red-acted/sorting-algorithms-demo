import { useState } from "react"

import InsertionSortView from "./sort_views/insertion/InsertionSortView"
import BubbleSortView from "./sort_views/bubble/BubbleSortView"
import SelectionSortView from "./sort_views/selection/SelectionSortView"

function App() {
    const [type, setType] = useState<"bubble" | "selection" | "insertion">("insertion")

    return (
        <div className="flex flex-col w-full h-full justify-center text-center">
            <h1 className="text-4xl p-4">Algoritmos de ordenação</h1>
            <ul className="flex flex-row justify-center items-center leading-4 whitespace-nowrap gap-2">
                <li className="contents">
                    <input className="scale-125" name="type" type="radio" checked={type === "insertion"} onChange={() => setType("insertion")} />
                    <label>Insertion sort</label>
                </li>

                <li className="contents">
                    <input className="scale-125" name="type" type="radio" checked={type === "bubble"} onChange={() => setType("bubble")} />
                    <label>Bubble sort</label>
                </li>

                <li className="contents">
                    <input className="scale-125" name="type" type="radio" checked={type === "selection"} onChange={() => setType("selection")} />
                    <label>Selection sort</label>
                </li>
            </ul>
            
            { type === "insertion" && <InsertionSortView />}
            { type === "bubble" && <BubbleSortView /> }
            { type === "selection" && <SelectionSortView /> }
        </div>
    )
}

export default App
