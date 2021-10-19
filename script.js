const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// song titles
const songs = ['trees', 'moonrise'];

//track songs
let songIndex = 1;

//load songs into DPOM
loadSong(songs[songIndex])

//update song details
function loadSong(song) {

    audio.src = `music/${song}.wav`
    //cover.src = `images/${song}.jpg`
    title.innerText = song
}


function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex])

    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex])

    playSong();
}

function updateProgess(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime - (clickX / width) * duration
}

// event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()   
    } else {
        playSong()
    }
})

//change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgess)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)