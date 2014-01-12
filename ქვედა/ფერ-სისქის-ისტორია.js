var ფერ_სისქის_ისტორია = function(ელემენტი, უკუძახილი){
    var ელ = document.createElement('div'),
            ფერსისქეები=[]
    
    ელ.width=170
    ელ.height=20
    
    var ცალი_ფერსისქე=Math.floor(ელ.width/(20+2))
    
    for(var ი=0;ი<ცალი_ფერსისქე;ი++){
        ფერსისქეები.push({
            ფერი:'rgb(255,255,255)',
            სისქე:5,
        })
    }
    
    ყველა_გადახატე()
    ელემენტი.appendChild(ელ)
    
    function ყველა_გადახატე(){
        while(ელემენტი.firstChild){
            ელემენტი.removeChild(ელემენტი.firstChild)
        }
        for(var ფ in ფერსისქეები){
            var ფერი_ელ=document.createElement('div'),
                სისქე_ელ=document.createElement('div'),
                ფერსისქე=ფერსისქეები[ფ]
        
            ფერი_ელ.className='ფერსისქე_ფერი'
            ფერი_ელ.style.backgroundColor=ფერსისქე.ფერი
  
            
//            სისქე_ელ.appendChild(document.createTextNode('1'))
            
            // სტილი არაფრით ენიჭება
            var სისქე_კუთხე=18/2-ფერსისქე.სისქე/2
            console.log(სისქე_კუთხე, ფერსისქე.სისქე)
            სისქე_ელ.className='ფერსისქე_სისქე'
            სისქე_ელ.style.left=სისქე_კუთხე
            სისქე_ელ.style.top=სისქე_კუთხე
            სისქე_ელ.style.width=ფერსისქე.სისქე
            სისქე_ელ.style.height=ფერსისქე.სისქე
            სისქე_ელ.style.borderRadius=ფერსისქე.სისქე / 2
            
            ფერი_ელ.appendChild(სისქე_ელ)
            ელ.appendChild(ფერი_ელ)
        }
    }
    
    return {
        ფერი_შეიცვალა:function(ფერი){
            ფერსისქეები.pop()
            
        },
        სისქე_შეიცვალა:function(სისქე){
            
        },
        დაიხატა:function(){
            
        }
    }
}

