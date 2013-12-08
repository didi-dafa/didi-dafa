var ფს=require('fs')
var ნახაზი=require('canvas')

var ნახაზები={}
var ფრაგმენტის_ხ=1024, ფრაგმენტის_ჯ=1024

function ნახაზების_მასივი(){
    var მასივი=[]
    for(var ნ in ნახაზები){
        მასივი.push(ნახაზები[ნ])
    }
    return მასივი
}

function ჩაწერე_რომელიც_საჭიროა(){
    for(var ნ in ნახაზები){
        var ნახაზი=ნახაზები[ნ]
        if(!ნახაზი.ჩასაწერი){
            continue
        }

        ნახაზი.toBuffer(function(ნახ){
            return function(შეც, სურათი){
                if(შეც) { console.log(შეც); return }
                ფს.writeFile('საცავი/'+ნახ.სახელი, სურათი, function(შეც){
                    if(შეც) { console.log(შეც) }
                })

            }
        }(ნახაზი))
        ნახაზი.ჩასაწერი=false
        
    }
}

function გაწმინდე_არასაჭირო(){
    var წმენდის_დაწყება=100,
        ძველად_ითვლება=1000*60*20 // ოცი წუთი

    var ნახაზების_რაოდენობა = Object.keys(ნახაზები).length,
        უნდა_წაიშალოს=ნახაზების_რაოდენობა-წმენდის_დაწყება
    if(ნახაზების_რაოდენობა<წმენდის_დაწყება){
        return
    }
    
    // გასაკეთებელია: მარტო ძველები - 
    var მასივი = ნახაზების_მასივი()
    var დალაგებული_ნახაზები = მასივი.sort(function(ა, ბ){
            return ა.ბოლო_აქტივობა>ბ.ბოლო_აქტივობა
        })
        
    for(var ი=0;ი<უნდა_წაიშალოს;ი++){
        var ნახაზი=დალაგებული_ნახაზები[ი]
        if(new Date().getTime()-ნახაზი.ბოლო_აქტივობა<ძველად_ითვლება){
            return
        }
        delete ნახაზები[ნახაზი.სახელი]
    }
}

setInterval(ჩაწერე_რომელიც_საჭიროა, 5000)
setInterval(გაწმინდე_არასაჭირო, 10000)

function გაათეთრე(ნახაზი){
    ნახაზი.კონტ.fillStyle="#FFFFFF";
    ნახაზი.კონტ.fillRect(0,0,ნახაზი.width, ნახაზი.height)
}

function გაალურჯე(ნახაზი){
    ნახაზი.კონტ.fillStyle="#0000FF";
    ნახაზი.კონტ.fillRect(0,0,ნახაზი.width, ნახაზი.height)
}

function მომე_მოზომილი_ფრაგმენტი(ხ, ჯ, შიდა, უკუძახილი){
    var სახელი = Math.floor(ხ/ფრაგმენტის_ხ)+'.'+Math.floor(ჯ/ფრაგმენტის_ჯ)
    var ნახ=ნახაზები[სახელი]
    if(ნახ){
        უკუძახილი(ნახ, შიდა)
        return
    }
    
    // ახალი ჩანაწერის მომზადება
    ნახ=new ნახაზი(ფრაგმენტის_ხ,ფრაგმენტის_ჯ)
    ნახ.კონტ=ნახ.getContext("2d");
    ნახ.სახელი=სახელი
    ნახ.ჩასაწერი=false
    ნახ.ბოლო_აქტივობა=new Date().getTime()
    ნახ.ხ=Math.floor(ხ/ფრაგმენტის_ხ)*ფრაგმენტის_ხ
    ნახ.ჯ=Math.floor(ჯ/ფრაგმენტის_ჯ)*ფრაგმენტის_ჯ
        
    ფს.exists('საცავი/'+სახელი, function(არსებობს){
        if(!არსებობს){
            გაათეთრე(ნახ)
            ნახაზები[სახელი]=ნახ
            უკუძახილი(ნახ, შიდა)
            return
        }
        ფს.readFile('საცავი/'+სახელი, function(შეც, შიგთავსი){
            if(შეც) { console.log(შეც); return }
            ნახაზები[სახელი]=ნახ
            var სურ = new ნახაზი.Image
            სურ.src=შიგთავსი
            ნახ.კონტ.drawImage(სურ, 0, 0, ფრაგმენტის_ხ, ფრაგმენტის_ჯ)
            უკუძახილი(ნახ, შიდა)
        })
    })
}

function მომე_შესაცვლელი_ფრაგმენტები(ნაქნარი1, ნაქნარი2, უკუძახილი){
    მომე_მოზომილი_ფრაგმენტი(ნაქნარი1.ხ, ნაქნარი1.ჯ, null, function(ნახ1){
        მომე_მოზომილი_ფრაგმენტი(ნაქნარი2.ხ, ნაქნარი2.ჯ, null, function(ნახ2){
            if(ნახ1==ნახ2){
                უკუძახილი([ნახ1], ნაქნარი1, ნაქნარი2)
            }else{
                უკუძახილი([ნახ1, ნახ2], ნაქნარი1, ნაქნარი2)
            }
        })
    })
}

exports.მიახატე=function(ნახატი){
    var გზა=ნახატი.გზა,
        ფერი=ნახატი.ფერი

    for(var ი=1;ი<გზა.length;ი++){
        var ნაქ=გზა[ი]
        var წინა_ნაქ=გზა[ი-1]
        
        მომე_შესაცვლელი_ფრაგმენტები(ნაქ, წინა_ნაქ, function(ფრაგმენტები, ნაქ1, წინა_ნაქ1){
            for(var ფ in ფრაგმენტები){
                var ფრაგმენტი = ფრაგმენტები[ფ]
                
                var ხ=ნაქ1.ხ-ფრაგმენტი.ხ,
                    ჯ=ნაქ1.ჯ-ფრაგმენტი.ჯ,
                    წინა_ხ=წინა_ნაქ1.ხ-ფრაგმენტი.ხ,
                    წინა_ჯ=წინა_ნაქ1.ჯ-ფრაგმენტი.ჯ
                    
                ფრაგმენტი.კონტ.strokeStyle=ფერი
                ფრაგმენტი.კონტ.beginPath()
                ფრაგმენტი.კონტ.moveTo(წინა_ხ,წინა_ჯ)
                ფრაგმენტი.კონტ.lineTo(ხ,ჯ)
                ფრაგმენტი.კონტ.stroke()
                ფრაგმენტი.ბოლო_აქტივობა=new Date().getTime()
                ფრაგმენტი.ჩასაწერი=true
            }
        })
    }
}

exports.მომე_ფრაგმენტი=function(ხ,ჯ,სიგანე,სიმაღლე, უკუძახილი){
    var ნახ=new ნახაზი(სიგანე, სიმაღლე),
        კონტ=ნახ.getContext('2d'),
        ხ_ნაბიჯები = Math.floor(სიგანე/ფრაგმენტის_ხ)+2,
        ჯ_ნაბიჯები = Math.floor(სიმაღლე/ფრაგმენტის_ჯ)+2
    
    var წყობა={}
    var დამუშავებული_ნაწილები=0
    for(var ი=0;ი<ხ_ნაბიჯები;ი++){
        for(var კ=0;კ<ჯ_ნაბიჯები;კ++){
            
            
            მომე_მოზომილი_ფრაგმენტი(ხ+ი*ფრაგმენტის_ხ, ჯ+კ*ფრაგმენტის_ჯ, 
            {ი:ი,კ:კ,ხ:ხ,ჯ:ჯ,სიგანე:სიგანე,სიმაღლე:სიმაღლე}, 
            function(ფრაგ, შიდა){
                დამუშავებული_ნაწილები++
                function გადადი_თუ_ბოლოა(){
                    if(დამუშავებული_ნაწილები==ხ_ნაბიჯები*ჯ_ნაბიჯები){
                        ჩახატე_ნაგროვები()
                    }
                }
                // თუ ეს უჯრა საერთოდ არ მონაწილეობს საქმეში, მაშინ გამოვრიცხოთ
                if(შიდა.ხ+შიდა.სიგანე<ფრაგ.ხ||
                        შიდა.ჯ+შიდა.სიმაღლე<ფრაგ.ჯ||
                        შიდა.ხ>ფრაგ.ხ+ფრაგმენტის_ხ||
                        შიდა.ჯ>ფრაგ.ჯ+ფრაგმენტის_ჯ){
                    
                    გადადი_თუ_ბოლოა()
                    return
                }
                // მოსაჭრელი ოთხკუთხედის წერტილების შერჩევა
                var ა=0,ბ=0,გან=შიდა.სიგანე,მაღ=შიდა.სიმაღლე
                
                // აქ პირობებია ამოჭრილი იმის გათვალისწინებით, რომ 
                // მანამდე არასაჭირო ნაჭრები იფილტრება და 
                // მაგალითად ხ>ფრაგ.ხ+ფრაგმენტის_ხ ვარიანტი არასდროს ამოვა.
                
                if(შიდა.ხ>=ფრაგ.ხ){
                    // თუ ხ წერტილი ფრაგმენტშია
                    ა=შიდა.ხ-ფრაგ.ხ
                    if(ა+შიდა.სიგანე>=ფრაგმენტის_ხ){
                        // თუ სიგანე საზღვარს გასცდა
                        გან=ფრაგმენტის_ხ-ა
                    }
                }else{
                    // თუ ფრაგმენტამდეა
                    გან=შიდა.სიგანე-(ფრაგ.ხ-შიდა.ხ)
                    if(გან>ფრაგმენტის_ხ){
                        გან=ფრაგმენტის_ხ
                    }
                }
                
                if(შიდა.ჯ>=ფრაგ.ჯ){
                    ბ=შიდა.ჯ-ფრაგ.ჯ
                    if(ბ+შიდა.სიმაღლე>=ფრაგმენტის_ჯ){
                        მაღ=ფრაგმენტის_ჯ-ბ
                    }
                }else{
                    მაღ=შიდა.სიმაღლე-(ფრაგ.ჯ-შიდა.ჯ)
                    if(მაღ>ფრაგმენტის_ჯ){
                        მაღ=ფრაგმენტის_ჯ
                    }
                }
                
                var დიდი_განზომილება=ხ_ნაბიჯები>ჯ_ნაბიჯები?ხ_ნაბიჯები:ჯ_ნაბიჯები
                წყობა[შიდა.ი*დიდი_განზომილება+შიდა.კ]={
                    ა:ა,
                    ბ:ბ,
                    გან:გან,
                    მაღ:მაღ,
                    ფრაგ:ფრაგ,
                    ფრაგ_სახ:ფრაგ.სახელი
                }
                
                გადადი_თუ_ბოლოა()
            })
        }
    }
    
    function ჩახატე_ნაგროვები(){
        var მდებარეობა_ხ=0, მდებარეობა_ჯ=0,
            გასაღებები=Object.keys(წყობა)
            
        for(var გ in გასაღებები){
            var წყობ=წყობა[გასაღებები[გ]]
            if(!წყობ){
                continue
            }
            კონტ.drawImage(წყობ.ფრაგ,წყობ.ა,წყობ.ბ,წყობ.გან,წყობ.მაღ,
                    მდებარეობა_ხ, მდებარეობა_ჯ, წყობ.გან,წყობ.მაღ)
            მდებარეობა_ჯ+=წყობ.მაღ
            if(მდებარეობა_ჯ>=სიმაღლე){
                მდებარეობა_ხ+=წყობ.გან
                მდებარეობა_ჯ=0
            }
        }
        
        ნახ.toBuffer(function(შეც, ინფო){
            if(შეც){ console.log(შეც); return }
            უკუძახილი(ინფო)
        })
    }
} 
