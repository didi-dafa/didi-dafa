var
    ზტგპ=require('http'),
    ფს=require('fs'),
    კითხვის_სიმი=require('querystring'),
    ერლ=require('url'),
    მოდულები=function(){
       var ეს = {
            ნაქნარები:require('./ნაქნარები'),
            საცავი:require('./საცავი'),
            თარგმანი:require('./თარგმანი')(),
        }

       ეს.მომხმარებლები = require('./მომხმარებლები')(ეს.ნაქნარები, ეს.თარგმანი)
       return ეს
    }()

var ფაილები=[{
        რეგამ:/^\/გულ-ღვიძლი\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('ქვედა/გულ-ღვიძლი.js'),
    },{
        რეგამ:/^\/ზოგადი\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('ქვედა/ზოგადი.js'),
    },{
        რეგამ:/^\/სახარახურე\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('ქვედა/სახარახურე.js'),
    },{
        რეგამ:/^\/ფერის-ასარჩევი\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('ქვედა/ფერის-ასარჩევი.js'),
    },{
        რეგამ:/^\/სისქის-ასარჩევი\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('ქვედა/სისქის-ასარჩევი.js'),
    },{
        რეგამ:/^\/ფერ-სისქის-ისტორია\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('ქვედა/ფერ-სისქის-ისტორია.js'),
    },{
        რეგამ:/^\/საცხობი\.js/i,
        შიგთავსის_ტიპი:"text/javascript; charset=utf-8",
        შიგთავსი:ფს.readFileSync('ქვედა/საცხობი.js'),
    },{
        რეგამ:/^\/სახე\.css/i,
        შიგთავსის_ტიპი:"text/css; charset=utf-8",
        შიგთავსი:ფს.readFileSync('ქვედა/სახე.css'),
    },{
        რეგამ:/^\/სურათები\/ლოგო\.png/i,
        შიგთავსის_ტიპი:"image/png",
        შიგთავსი:ფს.readFileSync('სურათები/ლოგო.png'),
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
        რეგამ:/^\/სად-არიან/,
        შიგთავსის_ტიპი:"application/json; charset=utf-8",
        დინამიური_შიგთავსი:require('./სად-არიან').ჩაუშვი,
    },{
        რეგამ:/^\/რა-დროა/,
        შიგთავსის_ტიპი:"text/plain",
        დინამიური_შიგთავსი:require('./რა-დროა').ჩაუშვი,
    },{
        რეგამ:/^\/მომე-თარგმანი/,
        შიგთავსის_ტიპი:"application/json; charset=utf-8",
        დინამიური_შიგთავსი:require('./მომე-თარგმანი').ჩაუშვი,
    },{
        რეგამ:/^\/ენების-სია/,
        შიგთავსის_ტიპი:"application/json; charset=utf-8",
        დინამიური_შიგთავსი:require('./ენების-სია').ჩაუშვი,
    },{
        რეგამ:/^\/მომე-ისტორია/,
        შიგთავსის_ტიპი:"application/json; charset=utf-8",
        დინამიური_შიგთავსი:require('./მომე-ისტორია').ჩაუშვი,
    }]

var მომ = ზტგპ.createServer(function(მოთხ, პასუხ){
    if(decodeURIComponent(მოთხ.url)=='/ცდა'){
        პასუხ.setHeader("Cache-Control", "max-age=0")
        პასუხ.setHeader("Content-Type", "text/plain; charset=utf-8")
        პასუხ.end("ცოცხალი ვარ")
        return
    }

    მოთხ.პარამები=კითხვის_სიმი.parse(ერლ.parse(მოთხ.url).query)
    for(var ფ in ფაილები){
        if(decodeURIComponent(მოთხ.url).match(ფაილები[ფ].რეგამ)){
            var ფაილი = ფაილები[ფ]
            პასუხ.setHeader("Content-Type", ფაილი.შიგთავსის_ტიპი)
            if(ფაილი.შიგთავსი){
                პასუხ.end(ფაილი.შიგთავსი)
            }else{
                var მომხმარებელი=მოდულები.მომხმარებლები.მომე(მოთხ)
                if(!მომხმარებელი&&მოთხ.url=='/'){
                    მომხმარებელი=მოდულები.მომხმარებლები.შექმენი(მოთხ, პასუხ)
                }else if(!მომხმარებელი){
                    პასუხ.statusCode=400;
                    პასუხ.setHeader("Content-Type", "text/plain; charset=utf-8")
                    პასუხ.end('ცუდი მოთხოვნა');
                    return
                }
                მომხმარებელი.აქტივობა()

                პასუხ.setHeader("Cache-Control", "max-age=0")
                ფაილი.დინამიური_შიგთავსი(მოთხ, პასუხ, მომხმარებელი, მოდულები)
            }
            return
        }
    }

    პასუხ.statusCode=404;
    პასუხ.setHeader("Content-Type", "text/plain; charset=utf-8")
    პასუხ.end('ფაილი ვერ მოიძებნა');
})

მომ.listen(9000, () => {
    console.log('Listening @ %j', მომ.address())
});
console.log('Starting')
