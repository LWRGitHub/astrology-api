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
  {"sign":"libra","src":"#"}, 
  {"sign":"aquarius","src":"#"},
  {"sign":"pisces","src":"#"},
  {"sign":"aries","src":"#"},
  {"sign":"taurus","src":"#"},
  {"sign":"gemini","src":"#"},
  {"sign":"cancer","src":"#"},
  {"sign":"leo","src":"#"},
  {"sign":"virgo","src":"#"},
  {"sign":"scorpio","src":"#"},
  {"sign":"sagittarius","src":"#"},
  {"sign":"capricorn","src":"#"}, 
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