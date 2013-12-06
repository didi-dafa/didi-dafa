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
        მდებარეობა_ხ.value=გლობალური_ხ
        return
    }
    გლობალური_ხ=+მდებარეობა_ხ.value
    გამოაცხვე_გლობალური_კოორდინატები()
    დაფა.მთლიანად_გადახატე()
}
მდებარეობა_ჯ.onblur=function(){
    if(!isFinite(მდებარეობა_ჯ.value)){
        მდებარეობა_ჯ.value=გლობალური_ჯ
        return
    }
    გლობალური_ჯ=+მდებარეობა_ჯ.value
    გამოაცხვე_გლობალური_კოორდინატები()
    დაფა.მთლიანად_გადახატე()
}

function განაახლე_მდებარეობა(){
    მდებარეობა_ხ.value=გლობალური_ხ
    მდებარეობა_ჯ.value=გლობალური_ჯ
}

განაახლე_მდებარეობა()