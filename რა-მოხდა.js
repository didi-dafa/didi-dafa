exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    if(!მოთხ.პარამები.როდიდან){
        console.log('რა-მოხდა: ცუდი მოთხოვნა')
        პასუხ.end()
        return
    }
    
    var მომხდარი = მოდულები.ნაქნარები.მომე(მომხმარებელი, მოთხ.პარამები.როდიდან)
        
    if(მომხდარი.length>0){
        პასუხ.end(JSON.stringify(მომხდარი))
    }else{
        მომხმარებელი.ველოდები_მოვლენას(პასუხ)
    }
} 
