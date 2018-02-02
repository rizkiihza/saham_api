var express = require("express");
var router = express.Router();
var googleFinance = require("google-finance");

//menghasilkan data harga dan volume untuk suatu harga saham
router.get("/:stock", (req, res, next) => {
   googleFinance.historical({
       symbol: "IIJ:" + req.params.stock
   }, function(err, quotes) {
       if (err) {
           console.log(err);
           res.json({"msg": err});
       } else {
           var data_close = [];
           var data_volume = [];
           for(var i = 0; i < quotes.length; i++) {
               data_close.push(quotes[i].close);
               data_volume.push(quotes[i].volume);
           }
           final_obj = { "close": data_close, "volume": data_volume};

           res.json(final_obj);
       }
   }) 
});

//mereturn full data dari sebuah saham
router.get("/full/:stock", (req, res, next) => {
    googleFinance.historical({
        symbol: "IIJ: " + req.params.stock
    }, function(err, quotes) {
        if (err) {
            console.log(err);
            res.json({"msg": err});
        } else {
            res.json(quotes);            
        }
    })
});

module.exports = router;