var კითხვის_სიმი=require('querystring'),
    ურლ=require('url')
    
exports.ჩაუშვი=function(მოთხ, პასუხ, სესიის_იდ, მომხმარებლები){
    var პარამეტრები = კითხვის_სიმი.parse(ურლ.parse(მოთხ.url).query)
    
    var ხ=პარამეტრები.ხ,
        ჯ=პარამეტრები.ჯ
    
    
    პასუხ.end(
        'ყვაა')
} 
