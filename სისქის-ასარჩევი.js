function ჩასვი_სისქის_ასარჩევი(ელემენტი, საწყისი, უკუძახილი){
    var ნახაზი = document.createElement('canvas'),
            კონტ = ნახაზი.getContext('2d'),
            სუფთა_ნახაზი = document.createElement('canvas'),
            სუფთა_კონტ = სუფთა_ნახაზი.getContext('2d'),
            მინიმალური=1, მაქსიმალური=10, კანტი=0
    
    ნახაზი.id='სისქის_ასარჩევი_ნახაზი'
    
    ნახაზი.width=სუფთა_ნახაზი.width=170
    ნახაზი.height=სუფთა_ნახაზი.height=20
    
    სუფთა_კონტ.beginPath()
    სუფთა_კონტ.moveTo(კანტი, ნახაზი.height/2+(მაქსიმალური/2))
    სუფთა_კონტ.lineTo(ნახაზი.width-კანტი, ნახაზი.height/2+მაქსიმალური/2)
    სუფთა_კონტ.lineTo(ნახაზი.width-კანტი, ნახაზი.height/(მაქსიმალური/2))
    სუფთა_კონტ.lineTo(კანტი, ნახაზი.height/2+მაქსიმალური/2)
    სუფთა_კონტ.closePath()
    სუფთა_კონტ.fillStyle='#000'
    სუფთა_კონტ.fill()
    
    var დაჭერილი = false, ბოლო_ხ
    
    ნახაზი.addEventListener('mousedown', function(მოვლ){
        var აბს = აბსოლუტური_მისამართი(this)
        if(მოვლ.button===0){
            დაჭერილი=true
            გადახატე_ნახაზი()
            გადახატე_მიმთითებელი(მოვლ.pageX-აბს.ხ)
        }
    })
    
    ნახაზი.addEventListener('mousemove', function(მოვლ){
        var აბს = აბსოლუტური_მისამართი(this)
        if(მოვლ.button===0&&დაჭერილი){
            გადახატე_ნახაზი()
            გადახატე_მიმთითებელი(მოვლ.pageX-აბს.ხ)
        }
    })
    
    ნახაზი.addEventListener('mouseup', function(მოვლ){
        if(მოვლ.button===0){
            დაჭერილი=false
            უკუძახილი(ბოლო_სისქე())
        }
    })
    
    window.addEventListener('mouseup', function(მოვლ){
        if(მოვლ.button===0&&დაჭერილი){
            დაჭერილი=false
            უკუძახილი(ბოლო_სისქე())
        }
    })
    
    window.addEventListener('mouseleave', function(მოვლ){
        if(მოვლ.button===0){
            დაჭერილი=false
        }
    })
    
    გადახატე_ნახაზი()
    გადახატე_მიმთითებელი(სისქედან_კოორდინატი(საწყისი))
    
    ელემენტი.appendChild(ნახაზი)
    
    function ბოლო_სისქე(){
        var სამოძრაო=ნახაზი.width-4,
                ხარისხი=ბოლო_ხ/სამოძრაო
        
        return მინიმალური+(მაქსიმალური-მინიმალური)*ხარისხი
    }
    
    function გადახატე_ნახაზი(){
        ნახაზი.width=ნახაზი.width
        კონტ.drawImage(სუფთა_ნახაზი,0,0)
    }
    function გადახატე_მიმთითებელი(ხ){
        var მდებარეობა=ხ>ნახაზი.width-4?ნახაზი.width-4:ხ
    
        ბოლო_ხ=მდებარეობა-კანტი
    
        კონტ.strokeStyle='#eee'
        კონტ.lineWidth=4
        კონტ.moveTo(ბოლო_ხ+2,0)
        კონტ.lineTo(ბოლო_ხ+2,ნახაზი.height)
        კონტ.stroke()
    }
    
    function სისქედან_კოორდინატი(სისქე){
        var ხარისხი = (სისქე-მინიმალური)/(მაქსიმალური-მინიმალური)
        
        return (ნახაზი.width-2*კანტი)*ხარისხი
    }
    
    function აბსოლუტური_მისამართი(ელემენტი){
        var ხ = 0,
            ჯ = 0,
            სამუშაო=ელემენტი
    
        while(სამუშაო.offsetParent){
            ხ+=სამუშაო.offsetLeft
            ჯ+=სამუშაო.offsetTop
            სამუშაო=სამუშაო.offsetParent
        }
        
        ხ+=სამუშაო.offsetLeft
        ჯ+=სამუშაო.offsetTop
        
	return {ხ:ხ,ჯ:ჯ};
    }
}