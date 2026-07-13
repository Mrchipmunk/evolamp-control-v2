input.onButtonPressed(Button.A, function () {
    if (Connected == "YES") {
        if (LightState == "ON") {
            radio.sendString("LAMPOFF")
            LightState = "OFF"
            basic.showLeds(`
                # . . . .
                # . # . .
                # . # # .
                # . . . .
                # # # # .
                `)
            sevenSegment.writeString("LAMP")
            basic.pause(250)
            sevenSegment.writeString("OFF")
            basic.pause(250)
            sevenSegment.clear()
        } else if (LightState == "OFF") {
            radio.sendString("LAMPON")
            LightState = "ON"
            sevenSegment.writeString("LAMP")
            basic.pause(250)
            sevenSegment.writeString("ON")
            basic.pause(250)
            sevenSegment.clear()
        } else if (LightState == "CRAMODE" && CRAMODE == "ON") {
            radio.sendString("CRAOFF")
            CRAMODE = "OFF"
            LightState = "OFF"
            basic.showString("CRAOFF")
        } else {
            basic.showString("ERR")
        }
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
        sevenSegment.writeString("ERR1")
    }
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("DISABLE")
    sevenSegment.scrollString("Off", 500)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "CONNECTED") {
        Connected = "YES"
        basic.showLeds(`
            . . . . #
            . . . # #
            . . # # #
            . # # # #
            # # # # #
            `)
        sevenSegment.scrollString("CONNECTED", 500)
        basic.pause(500)
        sevenSegment.clear()
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.B, function () {
    if (Connected == "YES") {
        if (CRAMODE == "OFF") {
            radio.sendString("CRAON")
            LightState = "CRAMODE"
            CRAMODE = "ON"
            basic.showString("CRAON")
        } else {
            basic.showString("USE A")
            sevenSegment.writeString("ERR2")
        }
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
        sevenSegment.writeString("ERR1")
    }
})
let Connected = ""
let LightState = ""
let CRAMODE = ""
sevenSegment.startSevenSegPin0()
basic.showLeds(`
    # . . . .
    # . # . .
    # . # # .
    # . . . .
    # # # # .
    `)
sevenSegment.scrollString("EVOLINKS", 500)
CRAMODE = "OFF"
let lightlevel = Math.map(input.lightLevel(), 0, 255, 0, 1023)
LightState = "OFF"
Connected = "NO"
radio.setGroup(1)
radio.sendString("CONNECT")
basic.showString("?")
sevenSegment.clear()
