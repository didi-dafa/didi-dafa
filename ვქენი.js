exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    var უმი=''
    მოთხ.on('data', function(ნაწყვეტი){
        უმი+=ნაწყვეტი.toString()
    })
    მოთხ.on('end', function(){
        var გზა=JSON.parse(უმი)
        var ნაქნარი = მოდულები.ნაქნარები.დაამატე(მომხმარებელი, გზა)
        მოდულები.საცავი.მიახატე(ნაქნარი)
        მოდულები.მომხმარებლები.მიეცი_მომლოდინეებს(ნაქნარი, მოდულები)
        პასუხ.end()
    })
} 
