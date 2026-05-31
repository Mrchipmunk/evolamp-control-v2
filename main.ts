input.onButtonPressed(Button.A, function () {
    if (Connected == "YES") {
        if (LightState == "ON") {
            radio.sendString("LAMPOFF")
            LightState = "OFF"
            basic.showString("OFF")
        } else if (LightState == "OFF") {
            radio.sendString("LAMPON")
            LightState = "ON"
            basic.showString("ON")
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
        basic.pause(500)
        basic.showIcon(IconNames.No)
        basic.pause(500)
        basic.clearScreen()
    }
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
        basic.pause(500)
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
        }
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
        basic.pause(500)
        basic.showIcon(IconNames.No)
        basic.pause(500)
        basic.clearScreen()
    }
})
let Connected = ""
let LightState = ""
let CRAMODE = ""
CRAMODE = "OFF"
let lightlevel = Math.map(input.lightLevel(), 0, 255, 0, 1023)
LightState = "OFF"
Connected = "NO"
basic.showString("EVOTEST")
radio.setGroup(1)
radio.sendString("CONNECT")
basic.showString("?")
basic.forever(function () {
	
})
