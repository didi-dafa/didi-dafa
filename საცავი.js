var ფს=require('fs')
var ნახაზი=require('canvas')

var ნახაზები={}
var ფრაგმენტის_ხ=1024, ფრაგმენტის_ჯ=1024

function მომე_მოზომილი_ფრაგმენტი(ხ, ჯ, უკუძახილი){
    var სახელი = Math.floor(ხ/ფრაგმენტის_ხ)+'.'+Math.floor(ჯ/ფრაგმენტის_ჯ)
    var ნახ=ნახაზები[სახელი]
    if(ნახ){
        უკუძახილი(ნახ)
        return
    }
    
    // ახალი ჩანაწერის მომზადება
    ნახ=new ნახაზი(ფრაგმენტის_ხ,ფრაგმენტის_ჯ)
    ნახ.სახელი=სახელი
    ნახ.ხ=Math.floor(ხ/ფრაგმენტის_ხ)*ფრაგმენტის_ხ
    ნახ.ჯ=Math.floor(ჯ/ფრაგმენტის_ჯ)*ფრაგმენტის_ჯ
    ნახ.ჩასაწერი=false
        
    ფს.exists('საცავი/'+სახელი, function(არსებობს){
        if(!არსებობს){
            ნახაზები[სახელი]=ნახ
            უკუძახილი(ნახ)
            return
        }
        ფს.readFile('საცავი/'+სახელი, function(შეც, შიგთავსი){
            if(შეც) { console.log(შეც); return }
            ნახაზები[სახელი]=ნახ
            var სურ = new ნახაზი.Image
            სურ.src=შიგთავსი
            ნახ.drawImage(სურ, 0, 0, ფრაგმენტის_ხ, ფრაგმენტის_ჯ)
            უკუძახილი(ნახ)
        })
    })
    
}

function მომე_შესაცვლელი_ფრაგმენტები(ნაქნარი1, ნაქნარი2, უკუძახილი){
    მომე_მოზომილი_ფრაგმენტი(ნაქნარი1.ხ, ნაქნარი1.ჯ, function(ნახ1){
        მომე_მოზომილი_ფრაგმენტი(ნაქნარი2.ხ, ნაქნარი2.ჯ, function(ნახ2){
            if(ნახ1==ნახ2){
                უკუძახილი([ნახ1], ნაქნარი1, ნაქნარი2)
            }else{
                უკუძახილი([ნახ1, ნახ2], ნაქნარი1, ნაქნარი2)
            }
        })
    })
}

exports.მიახატე=function(ნაქნარი){
    for(var ი=1;ი<ნაქნარი.length;ი++){
        var ნაქ=ნაქნარი[ი]
        var წინა_ნაქ=ნაქნარი[ი-1]
        
        მომე_შესაცვლელი_ფრაგმენტები(ნაქ, წინა_ნაქ, function(ფრაგმენტები, ნაქ1, წინა_ნაქ1){
            for(var ფ in ფრაგმენტები){
                var ფრაგმენტი = ფრაგმენტები[ფ]
                
                var ხ=ნაქ1.ხ-ფრაგმენტი.ხ,
                    ჯ=ნაქ1.ჯ-ფრაგმენტი.ჯ,
                    წინა_ხ=წინა_ნაქ1.ხ-ფრაგმენტი.ხ,
                    წინა_ჯ=წინა_ნაქ1.ჯ-ფრაგმენტი.ჯ
                    
                var კონტ = ფრაგმენტი.getContext('2d')
                    
                კონტ.moveTo(წინა_ხ,წინა_ჯ)
                კონტ.lineTo(ხ,ჯ)
                კონტ.stroke()
                ფრაგმენტი.ჩასაწერი=true
            }
        })
    }
}

exports.მომე_ფრაგმენტი=function(ხ,ჯ,სიგანე,სიმაღლე, უკუძახილი){
    var ნახ=new ნახაზი(სიგანე, სიმაღლე),
        კონტ=ნახ.getContext('2d'),
        ხ_ნაბიჯები = Math.floor(სიგანე/ფრაგმენტის_ხ)+2,
        ჯ_ნაბიჯები = Math.floor(სიგანე/ფრაგმენტის_ჯ)+2
    
    var წყობა={}
    for(var ი=0;ი<ხ_ნაბიჯები;ი++){
        for(var კ=0;კ<ჯ_ნაბიჯები;კ++){
            მომე_მოზომილი_ფრაგმენტი(ხ+ი*ფრაგმენტის_ხ, ჯ+კ*ფრაგმენტის_ჯ, function(ფრაგ){
                // მოსაჭრელი ოთხკუთხედის წერტილების შერჩევა
                var ა,ბ,გან,მაღ
                if(ხ>=ფრაგ.ხ){
                    ა=ხ
                }else{
                    ა=ფრაგ.ხ
                }
            
                if(ხ+სიგანე<ფრაგ.ხ+ფრაგმენტის_ხ){
                    გან=ხ+სიგანე-ა
                }else{
                    გან=ფრაგმენტის_ხ-ა
                }
                
                console.log(ფრაგ.სახელი, ხ, ფრაგ.ხ, სიგანე, ა, გან)
                
                if(ჯ>=ფრაგ.ჯ){
                    ბ=ჯ
                }else{
                    ბ=ფრაგ.ჯ
                }
            
                if(ჯ+სიმაღლე<ფრაგ.ჯ+ფრაგმენტის_ჯ){
                    მაღ=ჯ+სიმაღლე-ბ
                }else{
                    მაღ=ფრაგმენტის_ჯ-ბ
                }
                
                წყობა[ი+'.'+კ]={
                    ა:ა,
                    ბ:ბ,
                    გან:გან,
                    მაღ:მაღ,
                    ფრაგ:ფრაგ,
                    ფრაგ_სახ:ფრაგ.სახელი
                }
                
                if(ი==ხ_ნაბიჯები-1&&კ==ჯ_ნაბიჯები-1){
                    ჩახატე_ნაგროვები();
                }
            })
        }
    }
    
    function ჩახატე_ნაგროვები(){
        console.log(წყობა)
        var მდებარეობა_ხ=0, მდებარეობა_ჯ=0
        for(var ი=0;ი<ხ_ნაბიჯები;ი++){
            var წყობ
            for(var კ=0;კ<ჯ_ნაბიჯები;კ++){
                წყობ=წყობა[ი+'.'+კ]
                
                კონტ.drawImage(წყობ.ფრაგ,წყობ.ა,წყობ.ბ,წყობ.გან,წყობ.მაღ,
                    მდებარეობა_ხ, მდებარეობა_ჯ, წყობ.გან,წყობ.მაღ)
                მდებარეობა_ჯ+=წყობ.მაღ
            }
            მდებარეობა_ხ+=წყობ.გან
            მდებარეობა_ჯ=0
        }
        
        ნახ.toBuffer(function(შეც, ინფო){
            if(შეც){ 
                console.log(შეც)
                return
            }
            უკუძახილი(ინფო)
        })
    }
} 
