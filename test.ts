MY9221.init()
basic.forever(function () {
    let i = 1
    MY9221.send16bitsData(0x0000)
    MY9221.sendLED(0x0)
    MY9221.latchData()
    basic.pause(2000)
    while (i >= 0x0000) {
        MY9221.send16bitsData(0x0000)
        MY9221.sendLED(i)
        MY9221.latchData()
        //i = i + 1
        i = i * 2 
        if (i>1024)
        { 
            i=1
        }
        basic.pause(2000)
    }
})
