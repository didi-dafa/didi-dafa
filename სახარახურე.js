var სახელი = document.getElementById('სახელი')
სახელი.value=მომე_ნამცხვარი("სახელი")
სახელი.onblur=function(){
    გააგზავნე_ობიექტი('/ვქენი', {
        ტიპი:'სახელი შევიცვალე',
        მონაცემები:სახელი.value
    })
    მიე_ნამცხვარი('სახელი', სახელი.value)
}

var მომხმარებლები_ელ = document.getElementById('მომხმარებლები')
var მომხმარებლები={}

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
            ფანქრის_უჯრა = document.createElement('div'),
            სახელი = მომხმარებელი.სახელი?მომხმარებელი.სახელი:'უსახელო'
        
        მომხ_უჯრა.className='მომხმარებელი'
        მომხ_უჯრა['data-რიგის-ნომერი']=მომხმარებელი.რიგის_ნომერი
        მომხ_უჯრა.onclick=function(){
            var გადასასვლელი = მომხმარებლები[this['data-რიგის-ნომერი']]
            
            საც.ხ=გადასასვლელი.შუაწერტილი.ხ
            საც.ჯ=გადასასვლელი.შუაწერტილი.ჯ
            საც.შეინახე_მდებარეობა()
            დაფა.მთლიანად_გადახატე()
            განაახლე_მდებარეობა()
            თქვი_რომ_წავნაცვლდი()
        }
        
        ფერის_უჯრა.className='მომხმარებლის_ფერი'
        ფერის_უჯრა.style.backgroundColor=მომხმარებელი.ფერი
        
        if(მომხმარებელი.ხატავს){
            ფანქრის_უჯრა.className='მომხმარებლის_ფანქარი'
        }else{
            ფანქრის_უჯრა.className='მომხმარებლის_ფანქარი დამალული'
        }
        ფანქრის_უჯრა.appendChild(document.createTextNode('✎'))
    
        სახელის_უჯრა.className='მომხმარებლის_სახელი'
        სახელის_უჯრა.appendChild(document.createTextNode(სახელი))
        
        მომხ_უჯრა.appendChild(ფერის_უჯრა)
        მომხ_უჯრა.appendChild(ფანქრის_უჯრა)
        მომხ_უჯრა.appendChild(სახელის_უჯრა)
        მომხმარებლები_ელ.appendChild(მომხ_უჯრა)
    }
}

setInterval(function(){
    var შიცვალა=false
    for(var მ in მომხმარებლები){
        var მომხმარებელი = მომხმარებლები[მ]
        if(მომხმარებელი.ბოლო_ნახატის_დრო+5000<new Date().getTime()){
            მომხმარებელი.ხატავს=false
            შიცვალა=true
        }
    }
    if(შეიცვალა){
        განაახლე_მომხმარებლების_სია()
    }
}, 2000)

გააგზავნე('/სად-არიან', function(უმი_ხალხი){
    var ხალხი=JSON.parse(უმი_ხალხი)
    for(var მ in ხალხი){
        var მომხმარებელი = ხალხი[მ]
        
        მომხმარებლები[მომხმარებელი.რიგის_ნომერი]=მომხმარებელი
    }
    განაახლე_მომხმარებლების_სია()
})

var მდებარეობა_ხ = document.getElementById('მდებარეობა_ხ'),
    მდებარეობა_ჯ = document.getElementById('მდებარეობა_ჯ')

მდებარეობა_ხ.onblur=function(){
    if(!isFinite(მდებარეობა_ხ.value)){
        მდებარეობა_ხ.value=საც.ხ
        return
    }
    საც.ხ=+მდებარეობა_ხ.value
    საც.შეინახე_მდებარეობა()
    დაფა.მთლიანად_გადახატე()
    თქვი_რომ_წავნაცვლდი()
}
მდებარეობა_ჯ.onblur=function(){
    if(!isFinite(მდებარეობა_ჯ.value)){
        მდებარეობა_ჯ.value=საც.ჯ
        return
    }
    საც.ჯ=+მდებარეობა_ჯ.value
    საც.შეინახე_მდებარეობა()
    დაფა.მთლიანად_გადახატე()
    თქვი_რომ_წავნაცვლდი()
}

function განაახლე_მდებარეობა(){
    მდებარეობა_ხ.value=საც.ხ
    მდებარეობა_ჯ.value=საც.ჯ
}

განაახლე_მდებარეობა()

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
    console.log('ენის დაყენება',ენა_ელ.value)
    შეცვალე_ენა(ენა_ელ.value)
}

var ფერები = document.getElementById('ფერები')
ჩასვი_ფერების_ასარჩევი(ფერები, საც.ფერი, function(ფერი){
    საც.მიე_ფერი(ფერი)
    თქვი_რომ_ფერი_შევიცვალე()
})

var სახარახურე={
    ელემენტი:document.getElementById('სახარახურე'),
    გამოშლილია:false,
    გამოშალე:function(){
        this.ელემენტი.className="სახარახურე გამოშლილი_სახარახურე"
        this.გამოშლილია=true
    },
    შეკეცე:function(){
        this.ელემენტი.className="სახარახურე"
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