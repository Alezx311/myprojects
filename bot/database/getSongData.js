const needle = require('needle')
const fs = require('fs')
const cheerio = require('cheerio')

const songStoryUrl = "https://song-story.ru/sitemap/"
const guitarTabsSchools ="http://www.gtp-tabs.ru/n/tabs/56/"

let songLinks = []

function songLinksFinder() {
  let linkId = 0
  needle('get', songStoryUrl)
    .then(res => {
      let $ = cheerio.load(res.body)
      $('#content').find('a').each(function() {
        songLinks.push({
          linkId: linkId,
          linkText: $(this).text(),
          linkHref: $(this).attr('href'),
        })
        console.log(linkId)
        linkId++
      })
    })
    .then(() => {
      fs.writeFile('./songLinks.json', JSON.stringify(songLinks, null, 2), err => {
        if (err) throw err
        console.log('Done!')
      })
    })
    .then(getSongData(songLinks))
    .catch(err => console.log(err))
}

function getSongData(links) {
  let links.forEach(element => {
    needle('get', element.linkHref)
      .then(res => {
        let $ = cheerio.load(res.body)
        let song = {}
        song.artist = $('#content > article > h1').text().split('-')[0]
        song.title = $('#content > article > h1').text().split('-')[1]
        song.textData = []
        $('#content > article > div.entry-box.clearfix > div.entry').map((i, elem) => {
          if
        })
      })
  });
}
