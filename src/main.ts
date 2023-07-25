import * as ds from "@devicescript/core"
import { GPIOMode } from "@devicescript/core"
import "@devicescript/gpio"
import { pins } from "@dsboard/seeed_xiao_esp32c3"
import { schedule } from '@devicescript/runtime'

const minStepInterval = 1000

const p0 = pins.A0_D0
const p1 = pins.A1_D1
const p2 = pins.A2_D2
const p3 = pins.A3_D3
await p0.setMode(GPIOMode.Output)
await p1.setMode(GPIOMode.Output)
await p2.setMode(GPIOMode.Output)
await p3.setMode(GPIOMode.Output)

const oneStep = async (step: number) => {
    switch (step) {
        case 0:
            await p0.write(1)
            await p1.write(0)
            await p2.write(0)
            await p3.write(0)
            break;
        case 1:
            await p0.write(0)
            await p1.write(1)
            await p2.write(0)
            await p3.write(0)
            break;
        case 2:
            await p0.write(0)
            await p1.write(0)
            await p2.write(1)
            await p3.write(0)
            break;
        case 3:
            await p0.write(0)
            await p1.write(0)
            await p2.write(0)
            await p3.write(1)
            break;
        default:
            break;
    }
}

schedule(async ({ counter, elapsed, delta }) => {
    await oneStep(counter % 4)
    console.log(`counter: ${counter}, elapsed: ${elapsed}, delta: ${delta}`)
}, { interval: minStepInterval })
