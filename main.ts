/**
 * Simple test of using MBIT APP to control RobotBit...
 * 
 * Uses Motors connected to M1A  + M2B
 * 
 * Displays Direction Press in APP on MicroBit
 * 
 * F = Forward
 * 
 * B = Backwards
 * 
 * L = Turn Left
 * 
 * R - Turn Right
 * 
 * < = Spin Left
 * 
 * > = Spin Right
 * 
 * Use Piano Keys to control speed - press desired speed BEFORE pressing direction!
 * 
 * J
 */
function carctrl () {
    if (uartdata == "A") {
        basic.showString("F")
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        speed,
        robotbit.Motors.M2B,
        speed
        )
    } else if (uartdata == "B") {
        basic.showString("B")
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        speed * -1,
        robotbit.Motors.M2B,
        speed * -1
        )
    } else if (uartdata == "C") {
        basic.showString("L")
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        0,
        robotbit.Motors.M2B,
        speed
        )
    } else if (uartdata == "D") {
        basic.showString("R")
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        speed,
        robotbit.Motors.M2B,
        0
        )
    } else if (uartdata == "E") {
        basic.showString("<")
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        speed * -1,
        robotbit.Motors.M2B,
        speed
        )
    } else if (uartdata == "F") {
        basic.showString("<")
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        speed,
        robotbit.Motors.M2B,
        speed * -1
        )
    } else if (uartdata == "0") {
        basic.showIcon(IconNames.No)
        robotbit.MotorStopAll()
    }
}
function sendDistanceAndSpeed () {
    if (connected) {
        bluetooth.uartWriteString("$CSB" + "" + "," + speed + "#")
    }
}
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
    connected = false
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    sendDistanceAndSpeed()
    basic.pause(500)
    connected = true
    while (connected) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        carctrl()
        DoSpeed()
    }
})
function DoSpeed () {
    if (uartdata == "1") {
        speed = 20
    } else if (uartdata == "2") {
        speed = 50
    } else if (uartdata == "3") {
        speed = 100
    } else if (uartdata == "4") {
        speed = 120
    } else if (uartdata == "5") {
        speed = 160
    } else if (uartdata == "6") {
        speed = 180
    } else if (uartdata == "7") {
        speed = 220
    } else if (uartdata == "8") {
        speed = 255
    } else if (uartdata == "B1") {
        speed = 160
    } else if (uartdata == "B2") {
        speed = 180
    } else if (uartdata == "B3") {
        speed = 200
    } else if (uartdata == "B4") {
        speed = 255
    }
}
let uartdata = ""
let speed = 0
let connected = false
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
basic.showIcon(IconNames.StickFigure)
connected = false
speed = 100
basic.forever(function () {
    basic.pause(200)
    sendDistanceAndSpeed()
})
