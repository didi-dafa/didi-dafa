var ნამცხვარი = require('./ნამცხვარი')
var სია = {}
exports.სია = სია
var რიგი=0

exports.მომე = function(მოთხ, პასუხ, მოდულები) {
    var სესიის_იდ = ნამცხვარი.მომე(მოთხ, 'სესიის-იდ')
    var მომხმარებელი
    if (სესიის_იდ) {
        მომხმარებელი = სია[სესიის_იდ]
    }
    if (!მომხმარებელი) {
        var შემოსვლის_დრო = new Date().getTime(),
            სესიის_იდ = შემოსვლის_დრო,
            სახელი = ნამცხვარი.მომე(მოთხ, 'სახელი')
    
        console.log(სახელი)
    
        if(!სახელი){
            სახელი='მეგობარი '+Math.round(Math.random()*100000)
        }

        მომხმარებელი = {
            რიგის_ნომერი:++რიგი,
            სესიის_იდ: სესიის_იდ,
            შემოსვლის_დრო: შემოსვლის_დრო,
            სახელი:სახელი,
            ხედვის_არე:{ხ:0,ჯ:0,სიგანე:0,სიმაღლე:0},
            შეცვალე_ხედვის_არე: function(ხ, ჯ, სიგანე, სიმაღლე) {
                this.ხედვის_არე = {ხ: ხ, ჯ: ჯ, სიგანე: სიგანე, სიმაღლე: სიმაღლე,
                    შუაწერტილი: {
                        ხ: ხ + Math.floor(სიგანე / 2),
                        ჯ: ჯ + Math.floor(სიმაღლე / 2),
                    }
                }

                console.log('შეიცვალა ხედვის არე: ',this.ხედვის_არე.შუაწერტილი)
            },
            ველოდები_მოვლენას: function(პასუხ) {
                this.მოლოდინის_პასუხ = პასუხ
            },
        }

        სია[სესიის_იდ] = მომხმარებელი

        ნამცხვარი.მიე(პასუხ, 'სესიის-იდ', სესიის_იდ)
        ნამცხვარი.მიე(პასუხ, 'სახელი', მომხმარებელი.სახელი)
        
        var შეფუთული_ნაქნარი = მოდულები.ნაქნარები.დაამატე(მომხმარებელი, {
            ტიპი:"შემოვედი",
            მონაცემები:exports.სასხვისე_ვარიანტი(მომხმარებელი)})
        console.log('შეფუთული',შეფუთული_ნაქნარი)
        exports.მიეცი_მომლოდინეებს(შეფუთული_ნაქნარი, მოდულები)
    }
    return მომხმარებელი
}

exports.მიეცი_მომლოდინეებს = function(ნაქნარი, მოდულები) {
    for (var ს in სია){
        var მომხმარებელი=სია[ს]
        if(მომხმარებელი.რიგის_ნომერი==ნაქნარი.მქმნელი){
            continue
        }
        if (მომხმარებელი.მოლოდინის_პასუხ) {
            if(ნაქნარი.ტიპი=='დავხატე'&& !მოდულები.ნაქნარები.კვეთს_ხედვის_არეს(
                    ნაქნარი, მომხმარებელი.ხედვის_არე)){
                continue
            }
            
            მომხმარებელი.მოლოდინის_პასუხ.end(JSON.stringify([ნაქნარი]))
            delete მომხმარებელი.მოლოდინის_პასუხ
        }
    }
}

exports.სასხვისე_ვარიანტი=function(მომხმარებელი){
    return  {რიგის_ნომერი:მომხმარებელი.რიგის_ნომერი, 
            სახელი:მომხმარებელი.სახელი,
            შუაწერტილი:მომხმარებელი.ხედვის_არე.შუაწერტილი}
}