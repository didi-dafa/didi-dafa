exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    var სხვები=[]
    for(var სხვა_იდ in მოდულები.მომხმარებლები.სია){
        var სხვა=მოდულები.მომხმარებლები.სია[სხვა_იდ]
        if(სხვა.ხედვის_არე){
            სხვები.push(სხვა.ხედვის_არე.შუაწერტილი)
        }
    }
    პასუხ.end(JSON.stringify(სხვები))
} 
