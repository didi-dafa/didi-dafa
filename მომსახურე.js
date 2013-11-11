var 
    ზტგპ=require('http'),
    ფს=require('fs')

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
        რეგამ:/^\/საცავი/i,
        შიგთავსის_ტიპი:"image/png",
        დინამიური_შიგთავსი:require('./საცავი').ჩაუშვი,
    }]

ზტგპ.createServer(function(მოთხ, პასუხ){
    for(var ფ in ფაილები){
        if(decodeURIComponent(მოთხ.url).match(ფაილები[ფ].რეგამ)){
            var ფაილი = ფაილები[ფ]
            პასუხ.setHeader("Content-Type", ფაილი.შიგთავსის_ტიპი)
            if(ფაილი.შიგთავსი){
                პასუხ.end(ფაილი.შიგთავსი)
            }else{
                ფაილი.დინამიური_შიგთავსი(მოთხ, პასუხ)
            }
            return
        }
    }
    
    პასუხ.setStatusCode(404);
    პასუხ.end('ფაილი ვერ მოიძებნა');
}).listen(9000);
