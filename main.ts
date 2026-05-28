input.onButtonPressed(Button.A, function () {
    if (Connected == "YES") {
        if (LightState == "ON") {
            radio.sendString("LAMPOFF")
            LightState = "OFF"
            basic.showString("OFF")
        } else if (LightState == "OFF") {
            radio.sendString("LAMPON")
        } else if (LightState == "CRAMODE" && CRAMODE == "ON") {
            radio.sendString("CRAOFF")
            CRAMODE = "OFF"
            LightState = "OFF"
            basic.showString("CRAOFF")
        } else {
            basic.showString("ERR")
        }
    } else {
        record.startRecording(record.BlockingState.Blocking)
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
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
            radio.sendString("CRAON")
            LightState = "CRAMODE"
            CRAMODE = "ON"
            basic.showString("CRAON")
        } else {
            basic.showString("USE A")
        }
    } else {
        record.playAudio(record.BlockingState.Blocking)
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
music.setBuiltInSpeakerEnabled(true)
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Ringtone), music.PlaybackMode.InBackground)
basic.showString("EVOTEST")
radio.setGroup(1)
radio.sendString("CONNECT")
basic.showString("?")
basic.forever(function () {
	
})
