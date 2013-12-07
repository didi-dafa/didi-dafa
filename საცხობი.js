var საცხობი=function(){
    function ტექსტური(გასაღები, სასტარტო){
        var მნიშვნელობა=მომე_ნამცხვარი(გასაღები)
        if(!მნიშვნელობა){
            return სასტარტო
        }
        return მნიშვნელობა
    }
    function ციფრული(გასაღები, სასტარტო){
        var მნიშვნელობა=+მომე_ნამცხვარი(გასაღები)
        if(!მნიშვნელობა){
            return სასტარტო
        }
        return მნიშვნელობა
    }

    return {
        ხ:ციფრული('ხ',0),
        ჯ:ციფრული('ჯ',0),
        ენა:ტექსტური('ენა','ქართული-საქართველო'),
        ფერი:ტექსტური('ფერი','#000000'),
        მიე_ფერი:function(ფერი){
            მიე_ნამცხვარი('არჩეული_ფერი', ფერი)
        },
        მიე_ენა:function(ენა){
            this.ენა=ენა
            მიე_ნამცხვარი('ენა',ენა)
        },
        შეინახე_მდებარეობა:function(){
            მიე_ნამცხვარი('ხ', this.ხ)
            მიე_ნამცხვარი('ჯ', this.ჯ)
        }
    }
}

function მომე_ნამცხვარი(სახელი){
    var ნამცხვრები = document.cookie.match(
            encodeURIComponent(სახელი)+"=(.*?)(;|$)")
    if(!ნამცხვრები){
        return 
    }
    return decodeURIComponent(ნამცხვრები[1])
}

function მიე_ნამცხვარი(სახელი, მნიშვნელობა){
    document.cookie=encodeURIComponent(სახელი)+'='+
            encodeURIComponent(მნიშვნელობა)
}