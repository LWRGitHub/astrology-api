const request = require('request');

const horisAPI = async () =>{
  return new Promise((resolve, reject) => {
    const signs = ["libra", "aquarius", "pisces", "aries", "taurus", "gemini", "cancer", "leo", "virgo", "scorpio", "sagittarius", "capricorn"]
    let promises = [];

    for (let i = 0; i < signs.length; i++) {
      promises.push(
        new Promise((resolve, reject) => {
          
          request.get(`https://ohmanda.com/api/horoscope/${signs[i]}`, (err, res, body) => {
            if (res.statusCode === 200) {
              resolve(JSON.parse(body));
            } else {
              reject(err);
            }
          });
        })
      );
    }
    Promise.all(promises).then((data) => resolve(data));
  });
}

module.exports = (app) => {

  app.get('/', async (req, res) => {
    horisAPI()
    .then((data) => {
      console.log("------HERE var---------", data)
      res.render('index', { signDatas: data})
    })

    
    // const signDatas = await horisAPI()
    
    // console.log("------HERE var---------", signDatas)
    // // console.log("--------HERE await func call--------",await horisAPI())
    // res.render('index', { signDatas: signDatas});
  });

}