// imputs
let pomodoro = document.getElementById('pomodoro')
let short_break = document.getElementById('short_break')
let periods = document.getElementById('periods')
let seconds

// add audios
var bell = new Audio("./audio/bell.mp3")
var volta = new Audio("./audio/volta.mp3")
var final = new Audio("./audio/final.mp3")

var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

function iniciar() {
    if (pomodoro.value == 0) {
        document.getElementById('erro_pomodoro').innerHTML = "Adicione os minutos"
        pomodoro.focus()
    } else if (short_break == 0) {
        document.getElementById('erro_short_break').innerHTML = "Adicione a pausa"
        short_break.focus()
    } else if (periods == 0) {
        document.getElementById('erro_periods').innerHTML = "Adicione os períodos"
        periods.focus()
    } else {
        lofi.play()
        pause.style.setProperty('display', 'block', 'important')
    }
}