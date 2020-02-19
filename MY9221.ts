/**
* MakeCode editor extension for single or multiple MAX7219 8x8 matrix LED modules
* by Jay
*/

/**
 * My9221 block
 */
//% weight=100 color=#006d19 icon="\uf00a" block="MY9221"
namespace MY9221{
    let clk_flag = 0

    /**
    * initialization all LEDs and configuration Pins
    */
    //% blockId="MY9221_init"
    //% block="init"
    export function init() {
        pins.digitalWritePin(DigitalPin.P5, 0)
        pins.digitalWritePin(DigitalPin.P8, 0)
        let clk_flag = 0
    }

    //% blockId="MY9221_sendLED"
    //% block="sendLED state %state"
    export function sendLED(state:any) {
        for (let i = 0; i < 12; i++) {
            if (state&0x0001) {
                send16bitsData(0x00ff)
            }
            else {
                send16bitsData(0x0000)
                state = state >>> 1                        //change
             }
         }
    }

    //% blockId="MY9221_send16bitsData"
    //% block="send16bitsData data %data"
    export function send16bitsData(data: number) {
        for (let i = 0; i < 16; i++) { 
        if (data & 0x8000) {
            pins.digitalWritePin(DigitalPin.P5, 1)
        }
        else
        {
            pins.digitalWritePin(DigitalPin.P5, 0)
            
        }
        
        if (clk_flag) {
                pins.digitalWritePin(DigitalPin.P8, 0)
                 clk_flag = 0
            }
        else
        {
             pins.digitalWritePin(DigitalPin.P8, 1)
              clk_flag = 1
           
        }
            data = data << 1                           
        }      
    }

    //% blockId="MY9221_latchData"
    //% block="latchData"
    export function latchData():void {
        let latch_flag = 0
        pins.digitalWritePin(DigitalPin.P5, 0)
        control.waitMicros(200)

        for (let i = 0; i < 8; i++) {
            if (latch_flag) {
                pins.digitalWritePin(DigitalPin.P5, 0)
                latch_flag = 0
            }
            else {
                pins.digitalWritePin(DigitalPin.P5, 1)
                latch_flag = 1
             }
        }
        control.waitMicros(200)
    }
    
}
