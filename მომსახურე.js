var 
    ზტგპ=require('http'),
    ფს=require('fs'),
    მომხმარებლები=require('./მომხმარებლები')

var ფაილები=[{
        რეგამ:/^\/გულ-ღვიძლი\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('გულ-ღვიძლი.js'),
    },{
        რეგამ:/^\/სახე\.css/i,
        შიგთავსის_ტიპი:"text/css; charset=utf-8",
        შიგთავსი:ფს.readFileSync('სახე.css'),
    },{
        რეგამ:/^\/$/,
        შიგთავსის_ტიპი:"text/html; charset=utf-8",
        დინამიური_შიგთავსი:require('./დაფა').ჩაუშვი,
    },{
        რეგამ:/^\/საცავი/,
        შიგთავსის_ტიპი:"image/png",
        დინამიური_შიგთავსი:require('./საცავი').ჩაუშვი,
    },{
        რეგამ:/^\/ვქენი/,
        შიგთავსის_ტიპი:"text/plain",
        დინამიური_შიგთავსი:require('./ვქენი').ჩაუშვი,
    },{
        რეგამ:/^\/რა-მოხდა/,
        შიგთავსის_ტიპი:"text/plain",
        დინამიური_შიგთავსი:require('./რა-მოხდა').ჩაუშვი,
    }]


ზტგპ.createServer(function(მოთხ, პასუხ){
    var სესიის_იდ=მომხმარებლები.მომე_სესია(მოთხ, პასუხ)
    for(var ფ in ფაილები){
        if(decodeURIComponent(მოთხ.url).match(ფაილები[ფ].რეგამ)){
            var ფაილი = ფაილები[ფ]
            პასუხ.setHeader("Content-Type", ფაილი.შიგთავსის_ტიპი)
            if(ფაილი.შიგთავსი){
                პასუხ.end(ფაილი.შიგთავსი)
            }else{
                ფაილი.დინამიური_შიგთავსი(მოთხ, პასუხ, სესიის_იდ, მომხმარებლები)
            }
            return
        }
    }
    
    პასუხ.setStatusCode(404);
    პასუხ.end('ფაილი ვერ მოიძებნა');
}).listen(9000);
