var ფერ_სისქის_ისტორია = function(ელემენტი, უკუძახილი){
    var ელ = document.createElement('div'),
            ფერსისქეები=[]
    
    ელ.width=170
    ელ.height=20
    
    var ცალი_ფერსისქე=Math.floor(ელ.width/(20+2))
    
    for(var ი=0;ი<ცალი_ფერსისქე;ი++){
        ფერსისქეები.push({
            ფერი:'rgb(255,255,255)',
            სისქე:1,
            დაიხატა:false,
        })
    }
    
    ყველა_გადახატე()
    ელემენტი.appendChild(ელ)
    
    function ყველა_გადახატე(){
        while(ელ.firstChild){
            ელ.removeChild(ელ.firstChild)
        }
        
            console.log('123',ფერსისქეები.length)
            
        for(var ფ in ფერსისქეები){
            var ფერი_ელ=document.createElement('div'),
                სისქე_ელ=document.createElement('div'),
                ფერსისქე=ფერსისქეები[ფ]
        
            ფერი_ელ.className='ფერსისქე_ფერი'
            ფერი_ელ.style.backgroundColor=ფერსისქე.ფერი
  
            
//            სისქე_ელ.appendChild(document.createTextNode('1'))
            
            // სტილი არაფრით ენიჭება
            var სისქე_კუთხე=Math.floor(18/2-ფერსისქე.სისქე/2)
            სისქე_ელ.className='ფერსისქე_სისქე'
            სისქე_ელ.style.left=სისქე_კუთხე+'px'
            სისქე_ელ.style.top=სისქე_კუთხე+'px'
            სისქე_ელ.style.width=ფერსისქე.სისქე+'px'
            სისქე_ელ.style.height=ფერსისქე.სისქე+'px'
            სისქე_ელ.style.borderRadius=Math.floor(ფერსისქე.სისქე / 2)+'px'
            
            console.log((18/2-ფერსისქე.სისქე/2),(ფერსისქე.სისქე / 2))
            
            ფერი_ელ.appendChild(სისქე_ელ)
            ელ.appendChild(ფერი_ელ)
        }
    }
    
    return {
        შეიცვალა:function(ფერი, სისქე){
            
            var პირველი = ფერსისქეები[0]
            if(ფერსისქეები[0].დაიხატა){
                ფერსისქეები.pop()
                პირველი={
                    დაიხატა:false
                }
                ფერსისქეები.splice(0,0,პირველი)
            }
            
            პირველი.სისქე=სისქე
            პირველი.ფერი=ფერი
            ყველა_გადახატე()
        },
        დაიხატა:function(){
            ფერსისქეები[0].დაიხატა=true
        }
    }
}

