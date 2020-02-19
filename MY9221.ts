namespace MY9221{
    let clk_flag = 0

    export function init() {
        pins.digitalWritePin(DigitalPin.P5, 0)
        pins.digitalWritePin(DigitalPin.P8, 0)
        let clk_flag = 0
    }

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
