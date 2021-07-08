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

module.exports = (app) => {

    app.get(`/horoscope/:sign`, async (req, res) => {
        horisAPI(req.params.sign)
        .then((data) => {
            // console.log("------HERE var---------", data)
            res.render('horoscope', { signDatas: data})
        })
    });
}