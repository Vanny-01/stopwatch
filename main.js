const start = document.querySelector("#start")
const stop = document.querySelector("#stop")
const lap = document.querySelector("#lap")
const reset = document.querySelector("#reset")
const lapsContainer = document.querySelector('.laps')
const laps = document.querySelector('.laps-list')

const timeObj = {}

document.querySelectorAll(".watch span").forEach(x => {
  if (!(x.textContent === ":" || x.textContent === ".")) {
    Object.defineProperty(timeObj, x.id, {
      value: x
    });
  }
});

const doubleZeroes = num => (num < 10 ? "0" : "") + num;

class Stopwatch {
  constructor(){
    const { hours, minutes, seconds, milliseconds } = timeObj
    this.milliseconds = milliseconds
    this.seconds = seconds
    this.minutes = minutes
    this.hours = hours
  }
  updateTime(ms){
    if (ms > 99) {
      this.ms = 0
      this.s++
      this.seconds.textContent = doubleZeroes(this.s)      
    }
    if (this.s >= 60) {
      this.seconds.textContent = "00"
      this.s = 0
      this.min++
      this.minutes.textContent = doubleZeroes(this.min)
    }
    if (this.min >= 60) {
      this.minutes.textContent = "00"
      this.min = 0
      this.h++
      this.hours.textContent = doubleZeroes(this.h)
    }
    if (this.h === 24) {
      this.stop()
    }
  }
  lap(){
    if (this.isStarted){
      const { hours, minutes, seconds, milliseconds } = timeObj
      const time = `${hours.textContent}:${minutes.textContent}:${seconds.textContent}.${milliseconds.textContent}`
      const li = document.createElement("li")
      li.textContent = time
      laps.appendChild(li)
      setTimeout(() => {
        lapsContainer.scroll({ top: 9**20 })
      }, 2);
    }
  }
  start(){
    this.isStarted = true
    this.ms = parseInt(this.milliseconds.textContent)
    this.s = parseInt(this.seconds.textContent)
    this.min = parseInt(this.minutes.textContent)
    this.h = parseInt(this.hours.textContent) 
    if (!this.id) {
      this.id = setInterval(() => {
        this.ms++
        this.updateTime(this.ms)
        this.milliseconds.textContent = doubleZeroes(this.ms)
      }, 10)
    }
  }
  stop(){
    this.isStarted = false
    clearInterval(this.id)
    delete this.id
  }
  reset(){
    this.stop()
    this.milliseconds.textContent = "00"
    this.seconds.textContent = "00"
    this.minutes.textContent = "00"
    this.hours.textContent = "00"
    document.querySelectorAll(".laps-list li").forEach(x => {
      x.remove()
    })
  }
}

const s = new Stopwatch();

start.onclick = () => s.start()
stop.onclick = () => s.stop()
lap.onclick = () => s.lap()
reset.onclick = () => s.reset()

window.onkeydown = e => {
  if (e.key === "l") {
    s.lap();
  } else if (e.key === ' ') {
    if (s.isStarted) {
      s.stop()
    } else {
      s.start()
    }
  } else if (e.key === 'R') {
    s.reset()
  }
}
