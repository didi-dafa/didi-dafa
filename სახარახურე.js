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
    console.log(მომხმარებლები)
    for(var მ in მომხმარებლები){
        var მომხმარებელი = მომხმარებლები[მ],
            ჩასამატებელი = document.createElement('option'),
            სახელი = მომხმარებელი.სახელი?მომხმარებელი.სახელი:'უსახელო'
        
        ჩასამატებელი.appendChild(document.createTextNode(სახელი))
        ჩასამატებელი.value=მომხმარებელი.რიგის_ნომერი
        
        მომხმარებლები_ელ.appendChild(ჩასამატებელი)
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
ჩასვი_ფერების_ასარჩევი(ფერები, საც.ფერი, საც.მიე_ფერი)