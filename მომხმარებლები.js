var ნამცხვარი = require('./ნამცხვარი'),
        სია = {},
        რიგი=0,
        ნაქნარები,
        თარგმანი

function მომე(მოთხ){
    var სესიის_იდ = ნამცხვარი.მომე(მოთხ, 'სესიის-იდ')
    return სია[სესიის_იდ]
}
function შექმენი(მოთხ, პასუხ) {
    var შემოსვლის_დრო = new Date().getTime(),
        სესიის_იდ = შემოსვლის_დრო,
        სახელი = ნამცხვარი.მომე(მოთხ, 'სახელი'),
        ფერი = ნამცხვარი.მომე(მოთხ, 'ფერი'),
        ხ = ნამცხვარი.მომე(მოთხ, 'ხ'),
        ჯ = ნამცხვარი.მომე(მოთხ, 'ჯ')

    if(!სახელი){
        var მეგობრები = თარგმანი.ყველა_თარგმანი('მეგობარი')
        სახელი= მეგობრები[Math.floor(Math.random() * მეგობრები.length)]+ 
                ' '+Math.round(Math.random()*100000)
    }
    
    if(!ფერი){
        ფერი='#000000'
    }
    
    if(!ხ||!ჯ){
        ხ=0
        ჯ=0
    }

    var მომხმარებელი = {
        რიგის_ნომერი:++რიგი,
        სესიის_იდ: სესიის_იდ,
        შემოსვლის_დრო: შემოსვლის_დრო,
        ბოლო_აქტივობა: შემოსვლის_დრო,
        სახელი:სახელი,
        ფერი:ფერი,
        ხედვის_არე:{ხ:0,ჯ:0,სიგანე:0,სიმაღლე:0,შუაწერტილი:{ხ:ხ,ჯ:ჯ}},
        შეცვალე_ხედვის_არე: function(ხ, ჯ, სიგანე, სიმაღლე) {
            this.ხედვის_არე = {ხ: ხ, ჯ: ჯ, სიგანე: სიგანე, სიმაღლე: სიმაღლე,
                შუაწერტილი: {
                    ხ: ხ + Math.floor(სიგანე / 2),
                    ჯ: ჯ + Math.floor(სიმაღლე / 2),
                }
            }
        },
        ველოდები_მოვლენას: function(პასუხ) {
            this.მოლოდინის_პასუხ = პასუხ
        },
        სასხვისე_ვარიანტი: function(){
            return {
                რიგის_ნომერი:this.რიგის_ნომერი, 
                სახელი:this.სახელი,
                ფერი:this.ფერი,
                შუაწერტილი:this.ხედვის_არე.შუაწერტილი
            }
        },
        აქტივობა:function(){
            this.ბოლო_აქტივობა=new Date().getTime()
        }
    }

    სია[სესიის_იდ] = მომხმარებელი

    ნამცხვარი.მიე(პასუხ, 'სესიის-იდ', სესიის_იდ)
    ნამცხვარი.მიე(პასუხ, 'სახელი', მომხმარებელი.სახელი)

    var შეფუთული_ნაქნარი = ნაქნარები.დაამატე(მომხმარებელი, {
        ტიპი:"შემოვედი",
        მონაცემები:მომხმარებელი.სასხვისე_ვარიანტი()})
    მიეცი_მომლოდინეებს(შეფუთული_ნაქნარი)
    
    return მომხმარებელი
}

function მიეცი_მომლოდინეებს(ნაქნარი) {
    for (var ს in სია){
        var მომხმარებელი=სია[ს]
        if (მომხმარებელი.მოლოდინის_პასუხ) {
            var გაფილტრული = ნაქნარები.გაფილტრე(მომხმარებელი, ნაქნარი)
            if(გაფილტრული){
                მომხმარებელი.მოლოდინის_პასუხ.end(JSON.stringify([გაფილტრული]))
                delete მომხმარებელი.მოლოდინის_პასუხ
            }
        }
    }
}

setInterval(function(){
    var ახლა = new Date().getTime()
    for(var ს in სია){
        var მომხმარებელი = სია[ს]
        if(მომხმარებელი.ბოლო_აქტივობა+1000*60*15<ახლა){
            if(მომხმარებელი.მოლოდინის_პასუხ){
                მომხმარებელი.მოლოდინის_პასუხ.end('გამოცოცხლდი')
                მომხმარებელი.მოლოდინის_პასუხ=null
            }else{
                delete სია[ს]
                
                var შეფუთული_ნაქნარი = ნაქნარები.დაამატე(
                        მომხმარებელი, {ტიპი:"გავედი"})
                მიეცი_მომლოდინეებს(შეფუთული_ნაქნარი)
            }
        }
    }
}, 5000)

module.exports = function(ნაქ, თარგ){
    ნაქნარები=ნაქ
    თარგმანი=თარგ
    
    return {
        სია:სია,
        მომე:მომე,
        შექმენი:შექმენი,
        მიეცი_მომლოდინეებს:მიეცი_მომლოდინეებს,
    }
}