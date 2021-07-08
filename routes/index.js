const request = require('request');

module.exports = (app) => {

  /* GET home page. */
  // with pagination
  app.get('/', (req, res) => {

    const signs = ["libra", "aquarius", "pisces", "aries", "taurus", "gemini", "cancer", "leo", "virgo", "scorpio", "sagittarius", "capricorn"]
    let signDatas = []

    for(let i = 0; i < signs.length; i++){
      request(`https://ohmanda.com/api/horoscope/${signs[i]}`, function (err, res, body) {
        if (!err && res.statusCode == 200) {
          const signObj = JSON.parse(body)
          // console.log(signObj)
          signDatas.push(signObj)
          // console.log(signDatas)
        }
      })
    }
    
    console.log("------HERE---------",signDatas)
    res.render('index', { signDatas: signDatas });

  });

}