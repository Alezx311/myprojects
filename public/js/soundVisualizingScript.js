window.onload = function () {
  let startButton = document.getElementById('playAndPauseButton')
  let playButton = document.getElementById('changeInput')
  let audioElement = document.getElementById('audioElement')

  startButton.addEventListener('click', () => {

    let actx = new AudioContext()
    actx.create()

    function setup() {
      let fft = new p5.FFT()
      fft.analyze();
      // Get the volumes of different frequency ranges
      var bass = fft.getEnergy("bass");
      var mid = fft.getEnergy("mid");
      var treble = fft.getEnergy("treble");
      // Map the range of each volume with your desired numbers 
      var mapBass = map(bass, 0, 255, -100, 100);
      var mapMid = map(mid, 0, 255, -150, 150);
      var mapTreble = map(treble, 0, 255, -200, 200);
    }

    function draw() {
      for (i = 0; i < pieces; i++) {
        rotate(TWO_PI / pieces);
        // Draw the bass lines
        line(mapBass, radius / 2, 0, radius);
        // Draw the mid lines
        line(mapMid, radius / 2, 0, radius);
        // Draw the treble lines
        line(mapTreble, radius / 2, 0, radius);
      }
    }
  })
}