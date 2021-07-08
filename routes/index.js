const request = require('request');

const horisAPI = async () =>{
  const signs = ["libra", "aquarius", "pisces", "aries", "taurus", "gemini", "cancer", "leo", "virgo", "scorpio", "sagittarius", "capricorn"]
  let signDatas = []

  for(let i = 0; i < signs.length; i++){
    request(`https://ohmanda.com/api/horoscope/${signs[i]}`, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        const signObj = JSON.parse(body)
        // console.log(signObj)
        signDatas.push(signObj)
        // console.log(typeof(signDatas))
      }
    })
  }
  return signDatas
}

module.exports = (app) => {

  app.get('/', async (req, res) => {

    const signDatas = await horisAPI()
    
    console.log("------HERE var---------", signDatas)
    // console.log("--------HERE await func call--------",await horisAPI())
    res.render('index', { signDatas: signDatas});
  });

}