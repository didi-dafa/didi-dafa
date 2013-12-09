exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    var უმი=''
    მოთხ.on('data', function(ნაწყვეტი){
        უმი+=ნაწყვეტი.toString()
    })
    მოთხ.on('end', function(){
        var ნაქნარი
        try{
            ნაქნარი=JSON.parse(უმი)
        }catch(e){
            console.log(e)
            ცუდი_პარამეტრები()
            return
        }
        if(!ნაქნარი.ტიპი){
            ცუდი_პარამეტრები()
            return
        }
        var შეფუთული_ნაქნარი = მოდულები.ნაქნარები.დაამატე(მომხმარებელი, ნაქნარი)
        if(ნაქნარი.ტიპი=='დავხატე'){
            
            if(!შეფუთული_ნაქნარი.მონაცემები||
                !შეფუთული_ნაქნარი.მონაცემები.გზა||
                !შეფუთული_ნაქნარი.მონაცემები.ფერი){
                ცუდი_პარამეტრები()
                return
            }
            
            მოდულები.საცავი.მიახატე(შეფუთული_ნაქნარი.მონაცემები)
        }else if(ნაქნარი.ტიპი=='სახელი შევიცვალე'){
            
            if(!შეფუთული_ნაქნარი.მონაცემები){
                ცუდი_პარამეტრები()
                return
            }
            
            მომხმარებელი.სახელი=შეფუთული_ნაქნარი.მონაცემები
        }else if(ნაქნარი.ტიპი=='წავნაცვლდი'){
            
            if(!შეფუთული_ნაქნარი.მონაცემები||
                !შეფუთული_ნაქნარი.მონაცემები.ხ||
                !შეფუთული_ნაქნარი.მონაცემები.ჯ||
                !შეფუთული_ნაქნარი.მონაცემები.სიგანე||
                !შეფუთული_ნაქნარი.მონაცემები.სიმაღლე){
                ცუდი_პარამეტრები()
                return
            }
            
            მომხმარებელი.შეცვალე_ხედვის_არე(
                შეფუთული_ნაქნარი.მონაცემები.ხ,
                შეფუთული_ნაქნარი.მონაცემები.ჯ,
                შეფუთული_ნაქნარი.მონაცემები.სიგანე,
                შეფუთული_ნაქნარი.მონაცემები.სიმაღლე)
        }else if(ნაქნარი.ტიპი='ფერი შევიცვალე'){
            
            if(!შეფუთული_ნაქნარი.მონაცემები){
                ცუდი_პარამეტრები()
                return
            }
            
            მომხმარებელი.ფერი=შეფუთული_ნაქნარი.მონაცემები
        }
        მოდულები.მომხმარებლები.მიეცი_მომლოდინეებს(შეფუთული_ნაქნარი, მოდულები)
        პასუხ.end()
    })
    
    function ცუდი_პარამეტრები(){
        console.log('ვქენი: ცუდი მოთხოვნა')
        პასუხ.end()
    }
} 
