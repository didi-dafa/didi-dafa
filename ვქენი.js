exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    var უმი=''
    მოთხ.on('data', function(ნაწყვეტი){
        უმი+=ნაწყვეტი.toString()
    })
    მოთხ.on('end', function(){
        var ნაქნარი=JSON.parse(უმი)
        მოდულები.ნაქნარები.დაამატე(მომხმარებელი, ნაქნარი)
        მოდულები.საცავი.მიახატე(ნაქნარი)
        მოდულები.მომხმარებლები.მიეცი_მომლოდინეებს(ნაქნარი, მოდულები)
        პასუხ.end()
    })
} 
