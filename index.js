// Получаем ссылки на элементы аудиоплеера
const audio = document.getElementById("custom-audio");
const playPauseButton = document.getElementById("play-pause-button");
const playPauseImage = document.getElementById("play-pause-image");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const currentTimeSpan = document.getElementById("current-time");
const durationSpan = document.getElementById("duration");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

// Создаем список треков
const tracks = [
    {
        title: "Something In The Way",
        author: "Nirvana",
        src: "src/audio/1.mp3",
        cover: "src/img/1.jpg"
    },
    {
        title: "Don’t Delete the Kisses",
        author: "Wolf Alice",
        src: "src/audio/2.mp3",
        cover: "src/img/2.jpg"
    },
    {
        title: "На заре",
        author: "Альянс",
        src: "src/audio/3.mp3",
        cover: "src/img/3.jpg"
    },
];

function updateProgress() {
    if (!isNaN(audio.duration)) {
      const currentTime = Math.floor(audio.currentTime);
      const duration = Math.floor(audio.duration);
      const minutes = Math.floor(currentTime / 60);
      const seconds = currentTime % 60;
      currentTimeSpan.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      durationSpan.textContent = `${Math.floor(duration / 60)}:${duration % 60}`;
      const progressPercentage = (currentTime / duration) * 100;
      progress.style.width = `${progressPercentage}%`;
    }
}
  
// Обработчик события загрузки метаданных
audio.addEventListener("loadedmetadata", () => {
    // Вызывать обновление времени и полосы прогресса только после загрузки метаданных
    updateProgress();
});

let currentTrackIndex = 0;

// Функция для обновления информации о текущем треке
function updateTrackInfo() {
    const currentTrack = tracks[currentTrackIndex];
    audio.src = currentTrack.src;
    document.getElementById("track-title").textContent = currentTrack.title;
    document.getElementById("track-author").textContent = currentTrack.author;
    document.getElementById("cover-image").src = currentTrack.cover;
    durationSpan.textContent = "0:00"; // Обнуляем продолжительность при смене трека
}

// Функция для обновления времени и полосы прогресса
function updateProgress() {
    const currentTime = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    currentTimeSpan.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    durationSpan.textContent = `${Math.floor(duration / 60)}:${duration % 60}`;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
}

playPauseButton.addEventListener("click", () => {
    if (audio.paused || audio.ended) {
      audio.play();
      playPauseImage.src = "src/img/pause.png";
    } else {
      audio.pause();
      playPauseImage.src = "src/img/play.png";
    }
});

// Обработчик события окончания проигрывания
audio.addEventListener("ended", () => {
    // Переходим к следующему треку (если есть)
    currentTrackIndex++;
    if (currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0; // Зацикливаем плейлист
    }
    updateTrackInfo();
    audio.play();
});

// Обработчик изменения времени воспроизведения
audio.addEventListener("timeupdate", updateProgress);

// Обработчик щелчка по полосе прогресса
progressBar.addEventListener("click", (e) => {
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickX / progressBarWidth) * audio.duration;
    audio.currentTime = seekTime;
    updateProgress();
});

// Обработчик нажатия кнопки "Вперёд"
nextButton.addEventListener("click", () => {
    playPauseImage.src = "src/img/pause.png";
    currentTrackIndex++;
    if (currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0; // Зацикливаем плейлист
    }
    updateTrackInfo();
    audio.play();
});

// Обработчик нажатия кнопки "Назад"
prevButton.addEventListener("click", () => {
    playPauseImage.src = "src/img/pause.png";
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
        currentTrackIndex = tracks.length - 1; // Зацикливаем плейлист
    }
    updateTrackInfo();
    audio.play();
});

// Начинаем с первого трека
updateTrackInfo();