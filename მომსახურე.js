var 
    ზტგპ=require('http'),
    დაფა=require('./დაფა'),
    ფს=require('fs')

var სტატიკური_ფაილები=[{
        რეგამ:/^\/გულ-ღვიძლი\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('გულ-ღვიძლი.js'),
    },{
        რეგამ:/^\/სახე\.css/i,
        შიგთავსის_ტიპი:"text/css",
        შიგთავსი:ფს.readFileSync('სახე.css'),
    }]

function ჩაუშვი_სტატიკური_ფაილი(მის, პასუხ){
    var სტატფ
    for(var სტფ in სტატიკური_ფაილები){
        if(decodeURIComponent(მის).match(სტატიკური_ფაილები[სტფ].რეგამ)){
            სტატფ=სტატიკური_ფაილები[სტფ]
            break
        }
    }

    if(სტატფ){
        პასუხ.setHeader("Content-Type", სტატფ.შიგთავსის_ტიპი)
        პასუხ.end(სტატფ.შიგთავსი)
        return true;
    }
}

ზტგპ.createServer(function(მოთხ, პასუხ){
    if(ჩაუშვი_სტატიკური_ფაილი(მოთხ.url, პასუხ)){
        return;
    }
    დაფა.ჩაუშვი(პასუხ);
}).listen(9000);
