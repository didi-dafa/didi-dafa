var სახელი = document.getElementById('სახელი')
სახელი.value=საც.სახელი
სახელი.onblur=function(){
    if(საც.მიე_სახელი(სახელი.value)){
        გააგზავნე_ობიექტი('/ვქენი', {
            ტიპი:'სახელი შევიცვალე',
            მონაცემები:სახელი.value
        })
    }
}

var მომხმარებლები_ელ = document.getElementById('მომხმარებლები')
var მომხმარებლები={}

var მომხმარებელი = function(მომხმ){
    var ეს = {
        რიგის_ნომერი:მომხმ.რიგის_ნომერი, 
        სახელი:მომხმ.სახელი,
        ფერი:მომხმ.ფერი,
        შუაწერტილი:მომხმ.შუაწერტილი,
        დადის:false,
        ხატავს:false,
        მიე_დადის:function(){
            ეს.დადის=true
            ეს.ხატავს=false
            ეს.ბოლო_ნაქნარის_დრო=new Date().getTime()
        },
        მიე_ხატავს:function(){
            ეს.ხატავს=true
            ეს.დადის=false
            ეს.ბოლო_ნაქნარის_დრო=new Date().getTime()
        },
        გაჩერდა:function(){
            ეს.ხატავს=false
            ეს.დადის=false
        },
    }
    return ეს
}

function განაახლე_მომხმარებლების_სია(){
    while(მომხმარებლები_ელ.firstChild){
        მომხმარებლები_ელ.removeChild(მომხმარებლები_ელ.firstChild)
    }
    
    var მომხმარებლების_მასივი=[]
    for(var მ in მომხმარებლები){
        მომხმარებლების_მასივი.push(მომხმარებლები[მ])
    }
    
    var დალაგებული_მომხმარებლები=მომხმარებლების_მასივი.sort(
            function(მ1,მ2){
                if(!მ1.შუაწერტილი){
                    return false
                }
                if(!მ2.შუაწერტილი){
                    return true
                }
                var ცვლ_ხ_1 = Math.abs(მ1.შუაწერტილი.ხ-საც.ხ),
                    ცვლ_ჯ_1 = Math.abs(მ1.შუაწერტილი.ჯ-საც.ჯ),
                    ცვლ_ხ_2 = Math.abs(მ2.შუაწერტილი.ხ-საც.ხ),
                    ცვლ_ჯ_2 = Math.abs(მ2.შუაწერტილი.ჯ-საც.ჯ),
                    ცვლ_1 = ცვლ_ხ_1*ცვლ_ჯ_1,
                    ცვლ_2 = ცვლ_ხ_2*ცვლ_ჯ_2
            
                return ცვლ_1>ცვლ_2
            })
            
    for(var მ in დალაგებული_მომხმარებლები){
        var მომხმარებელი = დალაგებული_მომხმარებლები[მ],
            მომხ_უჯრა = document.createElement('div'),
            სახელის_უჯრა = document.createElement('div'),
            ფერის_უჯრა = document.createElement('div'),
            სტატუსის_უჯრა = document.createElement('div'),
            სახელი = მომხმარებელი.სახელი?მომხმარებელი.სახელი:'უსახელო'
        
        მომხ_უჯრა.className='სიის_ჩანაწერი'
        მომხ_უჯრა['data-რიგის-ნომერი']=მომხმარებელი.რიგის_ნომერი
        მომხ_უჯრა.onclick=function(){
            var გადასასვლელი = მომხმარებლები[this['data-რიგის-ნომერი']]
            
            საც.ხ=გადასასვლელი.შუაწერტილი.ხ
            საც.ჯ=გადასასვლელი.შუაწერტილი.ჯ
            საც.შეინახე_მდებარეობა()
            დაფა.მთლიანად_გადახატე()
            განაახლე_მდებარეობის_მაჩვენებელი()
            თქვი_რომ_წავნაცვლდი()
        }
        
        ფერის_უჯრა.className='სიის_ფერი'
        ფერის_უჯრა.style.backgroundColor=მომხმარებელი.ფერი
        
        if(მომხმარებელი.ხატავს||მომხმარებელი.დადის){
            სტატუსის_უჯრა.className='სიის_სტატუსი'
        }else{
            სტატუსის_უჯრა.className='სიის_სტატუსი დამალული'
        }
        if(მომხმარებელი.ხატავს){
            სტატუსის_უჯრა.appendChild(document.createTextNode('✎'))
        }else if(მომხმარებელი.დადის){
            სტატუსის_უჯრა.appendChild(document.createTextNode('➔'))
        }
        
    
        სახელის_უჯრა.className='სიის_სახელი'
        სახელის_უჯრა.appendChild(document.createTextNode(სახელი))
        
        მომხ_უჯრა.appendChild(ფერის_უჯრა)
        მომხ_უჯრა.appendChild(სტატუსის_უჯრა)
        მომხ_უჯრა.appendChild(სახელის_უჯრა)
        მომხმარებლები_ელ.appendChild(მომხ_უჯრა)
    }
}

function განაახლე_მომხმარებლები(){
    გააგზავნე('/სად-არიან', function(უმი_ხალხი){
        var ხალხი=JSON.parse(უმი_ხალხი)
        for(var მ in ხალხი){
            var მომხ = ხალხი[მ]
            
            მომხმარებლები[მომხ.რიგის_ნომერი]=new მომხმარებელი(მომხ)
        }
        განაახლე_მომხმარებლების_სია()
    })
}

განაახლე_მომხმარებლები()

setInterval(function(){
    var შეიცვალა=false
    for(var მ in მომხმარებლები){
        var მომხმარებელი = მომხმარებლები[მ]
        if(მომხმარებელი.ბოლო_ნაქნარის_დრო+5000<new Date().getTime()){
            if(მომხმარებელი.ხატავს||მომხმარებელი.დადის){
                შეიცვალა=true
            }
            მომხმარებელი.ხატავს=false
            მომხმარებელი.დადის=false
        }
    }
    if(შეიცვალა){
        განაახლე_მომხმარებლების_სია()
    }
}, 2000)


var ისტორია_ელ = document.getElementById('ისტორია'),
        ისტორია=[]
function დაამატე_ისტორიას(ნაქნარი){
    function მომე_მსგავსი(სახელი, ხ,ჯ){
        for(var ი in ისტორია){
            var ისტ = ისტორია[ი]
            if(ისტ.სახელი==სახელი&&
                    Math.abs(ისტ.ხ-ხ)<500&&
                    Math.abs(ისტ.ჯ-ჯ)<500){
                return [ი, ისტ]
            }   
        }
    }
    
    var მსგავსი=მომე_მსგავსი(ნაქნარი.სახელი, 
            ნაქნარი.ხ,
            ნაქნარი.ჯ)
            
    if(მსგავსი){
        ისტორია.splice(მსგავსი[0],1)
        ისტორია.splice(0,0,მსგავსი[1])
        მსგავსი[1].ფერი=ნაქნარი.ფერი
        მსგავსი[1].დრო=ნაქნარი.დრო
        მსგავსი[1].ხ=ნაქნარი.ხ
        მსგავსი[1].ჯ=ნაქნარი.ჯ
        მსგავსი[1].სისქე=ნაქნარი.სისქე
    }else{
        ისტორია.splice(0,0,{
            დრო:ნაქნარი.დრო,
            ხ:ნაქნარი.ხ,
            ჯ:ნაქნარი.ჯ,
            ფერი:ნაქნარი.ფერი,
            სახელი:ნაქნარი.სახელი,
            სისქე:ნაქნარი.სისქე,
        })
    }
    გადახატე_ისტორია()
}

function გადახატე_ისტორია(){
    while(ისტორია_ელ.firstChild){
        ისტორია_ელ.removeChild(ისტორია_ელ.firstChild)
    }
    
    for(var ი in ისტორია){
        var ისტ = ისტორია[ი],
                ჩანაწერი = document.createElement('div'),
                სახელი = document.createElement('div'),
                ფერი = document.createElement('div')
        ჩანაწერი.className='სიის_ჩანაწერი'
        ჩანაწერი['data-ხ']=ისტ.ხ
        ჩანაწერი['data-ჯ']=ისტ.ჯ
        სახელი.className='სიის_სახელი'
        სახელი.appendChild(document.createTextNode(ისტ.სახელი))
        ფერი.className='სიის_ფერი'
        ფერი.style.backgroundColor=ისტ.ფერი

        ჩანაწერი.appendChild(სახელი)
        ჩანაწერი.appendChild(ფერი)

        ჩანაწერი.onclick=function(){
                var ხ = this['data-ხ'],
                    ჯ = this['data-ჯ']

                საც.ხ=ხ
                საც.ჯ=ჯ
                საც.შეინახე_მდებარეობა()
                დაფა.მთლიანად_გადახატე()
                განაახლე_მდებარეობის_მაჩვენებელი()
                თქვი_რომ_წავნაცვლდი()
            }

        ისტორია_ელ.appendChild(ჩანაწერი)
    }
}

გააგზავნე('/მომე-ისტორია', function(უმი_ისტორია){
    var ისტორია = JSON.parse(უმი_ისტორია)

    for(var ი in ისტორია){
        დაამატე_ისტორიას(ისტორია[ი])
    }
})

var ენა_ელ = document.getElementById('ენა')
გააგზავნე('/ენების-სია', function(უმი_ენები){
    var ენები=JSON.parse(უმი_ენები)
    for(var ე in ენები){
        var ენ = ენები[ე]
        
        var ერთეული = document.createElement('option')
        ერთეული.appendChild(document.createTextNode(ენ))
        if(ენ==საც.ენა){
            ერთეული.selected=true
        }
        ენა_ელ.appendChild(ერთეული)
    }
})
ენა_ელ.onchange=function(მოვლ){
    შეცვალე_ენა(ენა_ელ.value)
}

var ფერის_ასარჩევი_ელ = document.getElementById('ფერის_ასარჩევი'),
    საფერე=new ფერის_ასარჩევი(ფერის_ასარჩევი_ელ, საც.ფერი, function(ფერი){
        if(საც.მიე_ფერი(ფერი)){
            
            საც.მიე_მიჭირავს('ფუნჯი')
            დაფა.გააახლეკურსორი()
            
            თქვი_რომ_ფერი_შევიცვალე()
        }
    })

var სისქის_ასარჩევი_ელ = document.getElementById('სისქის_ასარჩევი'),
    სასისქე=new სისქის_ასარჩევი(სისქის_ასარჩევი_ელ, საც.სისქე, function(სისქე){
        if(საც.მიე_სისქე(სისქე)){
            
            საც.მიე_მიჭირავს('ფუნჯი')
            დაფა.გააახლეკურსორი()
            
            თქვი_რომ_სისქე_შევიცვალე()
        }
    })
    
var სახარახურე={
    ელემენტი:document.getElementById('სახარახურე'),
    შიგთავსი:document.getElementById('სახარახურე_შიგთავსი'),
    გამოშლილია:false,
    გამოშალე:function(){
        this.ელემენტი.className="სახარახურე გამოშლილი_სახარახურე"
        this.შიგთავსი.className="გამოშლილი_სახარახურე_შიგთავსი"
        this.გამოშლილია=true
    },
    შეკეცე:function(){
        this.ელემენტი.className="სახარახურე"
        this.შიგთავსი.className=""
        this.გამოშლილია=false
    }
}

var სხვა_დანარჩენი = document.getElementById('სხვა_დანარჩენი'),
    სხვა_დანარჩენი_შიგთავსი = document.getElementById('სხვა_დანარჩენი_შიგთავსი')

სხვა_დანარჩენი.onclick=function(){
    if(სახარახურე.გამოშლილია){
        სახარახურე.შეკეცე()
        სხვა_დანარჩენი_შიგთავსი.style.visibility='hidden'
    }else{
        სახარახურე.გამოშალე()
        სხვა_დანარჩენი_შიგთავსი.style.visibility='visible'
    }
}

var უკუკავშირი = document.getElementById('უკუკავშირი')
უკუკავშირი.onclick=function(){
    საც.ხ=18328559
    საც.ჯ=10974432
    საც.შეინახე_მდებარეობა()
    დაფა.მთლიანად_გადახატე()
    განაახლე_მდებარეობის_მაჩვენებელი()
    თქვი_რომ_წავნაცვლდი()
}

