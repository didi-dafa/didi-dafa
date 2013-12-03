var 
    ზტგპ=require('http'),
    ფს=require('fs'),
    კითხვის_სიმი=require('querystring'),
    ურლ=require('url'),
    მოდულები={
        მომხმარებლები:require('./მომხმარებლები'),
        ნაქნარები:require('./ნაქნარები'),
        საცავი:require('./საცავი'),
    }

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
        რეგამ:/^\/მომე-ფრაგმენტი/,
        შიგთავსის_ტიპი:"image/png",
        დინამიური_შიგთავსი:require('./მომე-ფრაგმენტი').ჩაუშვი,
    },{
        რეგამ:/^\/ვქენი/,
        შიგთავსის_ტიპი:"text/plain",
        დინამიური_შიგთავსი:require('./ვქენი').ჩაუშვი,
    },{
        რეგამ:/^\/რა-მოხდა/,
        შიგთავსის_ტიპი:"application/json; charset=utf-8",
        დინამიური_შიგთავსი:require('./რა-მოხდა').ჩაუშვი,
    },{
        რეგამ:/^\/წავნაცვლდი/,
        შიგთავსის_ტიპი:"text/plain",
        დინამიური_შიგთავსი:require('./წავნაცვლდი').ჩაუშვი,
    },{
        რეგამ:/^\/სად-არიან/,
        შიგთავსის_ტიპი:"application/json; charset=utf-8",
        დინამიური_შიგთავსი:require('./სად-არიან').ჩაუშვი,
    },{
        რეგამ:/^\/რა-დროა/,
        შიგთავსის_ტიპი:"text/plain",
        დინამიური_შიგთავსი:require('./რა-დროა').ჩაუშვი,
    },{
        რეგამ:/^\/სახარახურე\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('სახარახურე.js'),
    }]

ზტგპ.createServer(function(მოთხ, პასუხ){
    var მომხმარებელი=მოდულები.მომხმარებლები.მომე(მოთხ, პასუხ)
    მოთხ.პარამები=კითხვის_სიმი.parse(ურლ.parse(მოთხ.url).query)
    for(var ფ in ფაილები){
        if(decodeURIComponent(მოთხ.url).match(ფაილები[ფ].რეგამ)){
            var ფაილი = ფაილები[ფ]
            პასუხ.setHeader("Content-Type", ფაილი.შიგთავსის_ტიპი)
            if(ფაილი.შიგთავსი){
                პასუხ.end(ფაილი.შიგთავსი)
            }else{
                ფაილი.დინამიური_შიგთავსი(მოთხ, პასუხ, მომხმარებელი, მოდულები)
            }
            return
        }
    }
    
    პასუხ.statusCode=404;
    პასუხ.end('ფაილი ვერ მოიძებნა');
}).listen(9000);
