var Product = require('../models/product')
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopping', { useNewUrlParser: true })

var products = [
    new Product({
        imagePath: "https://lh3.googleusercontent.com/O734bZcCBnJByaqe_rB9RHvkztXTUA4c_whT17MANmQ4ows79thsufyXzKUXyPD8DQjsAIc=s149",
        title: 'call of duty',
        description: 'awsome game!!!!1',
        price: 10
    }),
    new Product({
        imagePath: "https://smedia2.intoday.in/btmt/images/stories/pub_660x450_010219045955.jpg",
        title: 'PUBG',
        description: 'awsome game!!!!1',
        price: 20
    }),
    new Product({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Dota_2_Gameplay_Aug_2017.jpg/325px-Dota_2_Gameplay_Aug_2017.jpg",
        title: 'DOTA',
        description: 'awsome game!!!!1',
        price: 30
    }),
    new Product({
        imagePath: "https://images.g2a.com/newlayout/323x433/1x1x0/387a113709aa/59e5efeb5bafe304c4426c47",
        title: 'GTA 5',
        description: 'awsome game!!!!1',
        price: 40
    }),
];
var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save((err, res) => {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}

