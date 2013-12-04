var სახელი = document.getElementById('სახელი')
სახელი.value=მომე_ნამცხვარი("სახელი")
სახელი.onblur=function(){
    გააგზავნე_ობიექტი('/ვქენი', JSON.stringify({
        ტიპი:'სახელი შევიცვალე',
        მონაცემები:სახელი.value
    }))
    მიე_ნამცხვარი('სახელი', სახელი.value)
}

var მომხმარებლები = document.getElementById('მომხმარებლები')
გააგზავნე('/სად-არიან', function(უმი_ხალხი){
    var ხალხი=JSON.parse(უმი_ხალხი)
    console.log(ხალხი)
    for(var მ in ხალხი){
        var მომხმარებელი = ხალხი[მ],
            ჩასამატებელი = document.createElement('option')
        
        ჩასამატებელი.appendChild(document.createTextNode(მომხმარებელი.სახელი))
        ჩასამატებელი.value=მომხმარებელი.რიგის_ნომერი
        
        მომხმარებლები.appendChild(ჩასამატებელი)
    }
})