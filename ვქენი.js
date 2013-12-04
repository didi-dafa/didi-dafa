exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    var უმი=''
    მოთხ.on('data', function(ნაწყვეტი){
        უმი+=ნაწყვეტი.toString()
    })
    მოთხ.on('end', function(){
        var ნაქნარი=JSON.parse(უმი)
        var შეფუთული_ნაქნარი = მოდულები.ნაქნარები.დაამატე(მომხმარებელი, ნაქნარი)
        if(ნაქნარი.ტიპი=='დავხატე'){
            მოდულები.საცავი.მიახატე(შეფუთული_ნაქნარი.მონაცემები)
        }else if(ნაქნარი.ტიპი=='სახელი შევიცვალე'){
            მომხმარებელი.სახელი=შეფუთული_ნაქნარი.მონაცემები
        }else if(ნაქნარი.ტიპი=='წავნაცვლდი'){
            მომხმარებელი.შეცვალე_ხედვის_არე(
                შეფუთული_ნაქნარი.მონაცემები.ხ,
                შეფუთული_ნაქნარი.მონაცემები.ჯ,
                შეფუთული_ნაქნარი.მონაცემები.სიგანე,
                შეფუთული_ნაქნარი.მონაცემები.სიმაღლე)
        }
        მოდულები.მომხმარებლები.მიეცი_მომლოდინეებს(შეფუთული_ნაქნარი, მოდულები)
        პასუხ.end()
    })
} 
