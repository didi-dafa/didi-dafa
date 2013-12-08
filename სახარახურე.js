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
    for(var მ in მომხმარებლები){
        var მომხმარებელი = მომხმარებლები[მ],
            მომხ_უჯრა = document.createElement('div'),
            სახელის_უჯრა = document.createElement('div'),
            ფერის_უჯრა = document.createElement('div'),
            სახელი = მომხმარებელი.სახელი?მომხმარებელი.სახელი:'უსახელო'
        
        მომხ_უჯრა.className='მომხმარებელი'
        მომხ_უჯრა['data-რიგის-ნომერი']=მომხმარებელი.რიგის_ნომერი
        მომხ_უჯრა.onclick=function(მოვლ){
            console.log(this['data-რიგის-ნომერი'])
        }
        
        ფერის_უჯრა.className='მომხმარებლის_ფერი'
        ფერის_უჯრა.style.backgroundColor=მომხმარებელი.ფერი
    
        console.log(მომხმარებელი.ფერი)
        სახელის_უჯრა.className='მომხმარებლის_სახელი'
        სახელის_უჯრა.appendChild(document.createTextNode(სახელი))
        
        მომხ_უჯრა.appendChild(ფერის_უჯრა)
        მომხ_უჯრა.appendChild(სახელის_უჯრა)
        მომხმარებლები_ელ.appendChild(მომხ_უჯრა)
    }
}

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
}
მდებარეობა_ჯ.onblur=function(){
    if(!isFinite(მდებარეობა_ჯ.value)){
        მდებარეობა_ჯ.value=საც.ჯ
        return
    }
    საც.ჯ=+მდებარეობა_ჯ.value
    საც.შეინახე_მდებარეობა()
    დაფა.მთლიანად_გადახატე()
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