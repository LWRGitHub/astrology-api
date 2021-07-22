const request = require('request');

const horisAPI = async (sign) =>{
    return new Promise((resolve, reject) => {
        let promises = [];
    
      
        promises.push(
            new Promise((resolve, reject) => {
                
                request.get(`https://ohmanda.com/api/horoscope/${sign}`, (err, res, body) => {
                    if (res.statusCode === 200) {
                        resolve(JSON.parse(body));
                    } else {
                        reject(err);
                    }
                });
            })
        );
        Promise.all(promises).then((data) => resolve(data));
    });
} 

const signs = [
  {"sign":"libra","src":"img/libra.jpg"}, 
  {"sign":"aquarius","src":"img/aquarius.jpg"},
  {"sign":"pisces","src":"img/pisces.jpg"},
  {"sign":"aries","src":"img/aries.jpg"},
  {"sign":"taurus","src":"img/taurus.jpg"},
  {"sign":"gemini","src":"img/gemini.jpg"},
  {"sign":"cancer","src":"img/cancer.jpg"},
  {"sign":"leo","src":"img/leo.jpg"},
  {"sign":"virgo","src":"img/virgo.jpg"},
  {"sign":"scorpio","src":"img/scorpio.jpg"},
  {"sign":"sagittarius","src":"img/sagittarius.jpg"},
  {"sign":"capricorn","src":"img/capricorn.jpg"}, 
]

module.exports = (app) => {

  app.get('/', async (req, res) => {
      res.render('index', { signDatas: signs})
  });

  app.get(`/horoscope/:sign`, async (req, res) => {
    horisAPI(req.params.sign)
    .then((data) => {
        // console.log("------HERE var---------", data)
        res.render('horoscope', { signData: data[0]})
    })
});

}