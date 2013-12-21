function ჩასვი_ფერების_ასარჩევი(ელემენტი, საწყისი_ფერი, უკუძახილი){
    var ნახაზი = document.createElement('canvas'),
            კონტ = ნახაზი.getContext('2d'),
            არჩეული_ფერი = document.createElement('div')
          
    ნახაზი.id='ფერების_ასარჩევი_ნახაზი'
    
    ნახაზი.width=145;
    ნახაზი.height=50;
    
    არჩეული_ფერი.id='არჩეული_ფერი'
        
    var მონაცემები = კონტ.createImageData(ნახაზი.width, ნახაზი.height),
        საწყისი_ფერ = ფერიდან_რიცხვები(საწყისი_ფერი),
        ახლო_ფერი = {
            მისამართი:{ხ:0,ჯ:0},
            დაშორება:{წითელი:255, 
                მწვანე:255, 
                ლურჯი:255}
        }
    
    for(var ი=0;ი<ნახაზი.width;ი++){
        for(var კ=0;კ<ნახაზი.height;კ++){
            var მის = (ი+კ*მონაცემები.width)*4,
                სიგანის_პროცენტი=ი/მონაცემები.width
        
            var მეექვსედი = Math.floor(სიგანის_პროცენტი/(1/6)),
                    მეექვსედში_პროცენტი = (სიგანის_პროცენტი%(1/6))/(1/6),
                    წითლის_შერევა, მწვანეს_შერევა, ლურჯის_შერევა
            
            switch(მეექვსედი){
                case 0:
                    წითლის_შერევა=1
                    მწვანეს_შერევა=მეექვსედში_პროცენტი
                    ლურჯის_შერევა=0
                    break
                case 1:
                    წითლის_შერევა=1-მეექვსედში_პროცენტი
                    მწვანეს_შერევა=1
                    ლურჯის_შერევა=0
                    break
                case 2:
                    წითლის_შერევა=0
                    მწვანეს_შერევა=1
                    ლურჯის_შერევა=მეექვსედში_პროცენტი
                    break
                case 3:
                    წითლის_შერევა=0
                    მწვანეს_შერევა=1-მეექვსედში_პროცენტი
                    ლურჯის_შერევა=1
                    break
                case 4:
                    წითლის_შერევა=მეექვსედში_პროცენტი
                    მწვანეს_შერევა=0
                    ლურჯის_შერევა=1
                    break
                case 5:
                    წითლის_შერევა=1
                    მწვანეს_შერევა=0
                    ლურჯის_შერევა=1-მეექვსედში_პროცენტი
                    break
            }
            
            var ნახევარ_სიმაღლის_პროცენტი=
                    (კ%(მონაცემები.height/2))/(მონაცემები.height/2),
                წითელი=255*წითლის_შერევა, 
                მწვანე=255*მწვანეს_შერევა, 
                ლურჯი=255*ლურჯის_შერევა
            
            if(კ<მონაცემები.height/2){
                წითელი+=(255-წითელი)*(1-ნახევარ_სიმაღლის_პროცენტი)
                მწვანე+=(255-მწვანე)*(1-ნახევარ_სიმაღლის_პროცენტი)
                ლურჯი+=(255-ლურჯი)*(1-ნახევარ_სიმაღლის_პროცენტი)
            }else{
                წითელი*=1-ნახევარ_სიმაღლის_პროცენტი
                მწვანე*=1-ნახევარ_სიმაღლის_პროცენტი
                ლურჯი*=1-ნახევარ_სიმაღლის_პროცენტი
            }
            
            წითელი=Math.floor(წითელი)
            მწვანე=Math.floor(მწვანე)
            ლურჯი=Math.floor(ლურჯი)
        
            მონაცემები.data[მის]=წითელი;
            მონაცემები.data[მის+1]=მწვანე;
            მონაცემები.data[მის+2]=ლურჯი;
            მონაცემები.data[მის+3]=255;
            
            var დაშორება={
                    წითელი:Math.abs(წითელი-საწყისი_ფერ.წითელი),
                    მწვანე:Math.abs(მწვანე-საწყისი_ფერ.მწვანე),
                    ლურჯი:Math.abs(ლურჯი-საწყისი_ფერ.ლურჯი),
                }
            if(დაშორება.წითელი<=ახლო_ფერი.დაშორება.წითელი&&
                    დაშორება.მწვანე<=ახლო_ფერი.დაშორება.მწვანე&&
                    დაშორება.ლურჯი<=ახლო_ფერი.დაშორება.ლურჯი){
                ახლო_ფერი={
                    მისამართი:{ხ:ი,ჯ:კ}, 
                    დაშორება:{წითელი:დაშორება.წითელი, 
                        მწვანე:დაშორება.მწვანე, 
                        ლურჯი:დაშორება.ლურჯი}
                }
            }
        }
    }

    გადახატე_ნახაზი()
    
    გადახატე_მიმთითებელი(ახლო_ფერი.მისამართი.ხ,ახლო_ფერი.მისამართი.ჯ,'#0F0')
    
    var დაჭერილი = false,
            ბოლო_ხ, ბოლო_ჯ
    ნახაზი.addEventListener('mousedown', function(მოვლ){
        var აბს = აბსოლუტური_მისამართი(this)
        if(მოვლ.button===0){
            დაჭერილი=true
            გადახატე_ნახაზი()
            გადახატე_მიმთითებელი(მოვლ.pageX-აბს.ხ, მოვლ.pageY-აბს.ჯ, '#0F0')
        }
    })
    
    ნახაზი.addEventListener('mousemove', function(მოვლ){
        var აბს = აბსოლუტური_მისამართი(this)
        if(მოვლ.button===0&&დაჭერილი){
            გადახატე_ნახაზი()
            გადახატე_მიმთითებელი(მოვლ.pageX-აბს.ხ, მოვლ.pageY-აბს.ჯ, '#0F0')
        }
    })
    
    ნახაზი.addEventListener('mouseup', function(მოვლ){
        if(მოვლ.button===0){
            დაჭერილი=false
            უკუძახილი(ბოლო_ფერი())
        }
    })
    
    window.addEventListener('mouseup', function(მოვლ){
        if(მოვლ.button===0&&დაჭერილი){
            დაჭერილი=false
            უკუძახილი(ბოლო_ფერი())
        }
    })
    
    window.addEventListener('mouseleave', function(მოვლ){
        if(მოვლ.button===0){
            დაჭერილი=false
        }
    })
    
    function ბოლო_ფერი(){
        var მისამართი = (ბოლო_ხ-1+მონაცემები.width*(ბოლო_ჯ-1))*4
            წითელი = მონაცემები.data[მისამართი],
            მწვანე = მონაცემები.data[მისამართი+1],
            ლურჯი = მონაცემები.data[მისამართი+2]
    
        return 'rgb('+წითელი+','+მწვანე+','+ლურჯი+')'
    }
    
    ელემენტი.appendChild(ნახაზი)
    ელემენტი.appendChild(არჩეული_ფერი)
    
    function გადახატე_ნახაზი(){
        კონტ.putImageData(მონაცემები, 0, 0)
    }
    function გადახატე_მიმთითებელი(ხ, ჯ, ფერი){
        ბოლო_ხ=ხ
        ბოლო_ჯ=ჯ
        
        კონტ.beginPath()
        კონტ.fillStyle=ფერი
        კონტ.strokeStyle='rgb(0,0,0,0.5)'
        
        კონტ.moveTo(ხ,0)
        კონტ.lineTo(ხ,ნახაზი.height)
        კონტ.stroke()
        
        კონტ.moveTo(0,ჯ)
        კონტ.lineTo(ნახაზი.width,ჯ)
        კონტ.stroke()
        
        არჩეული_ფერი.style.backgroundColor=ბოლო_ფერი()
    }
    function ფერიდან_რიცხვები(ფერი){
        var მთხვ = ფერი.match(/rgb\((\d*),(\d*),(\d*)\)/)
        if(!მთხვ){
            return {წითელი:0, მწვანე:0, ლურჯი:0}
        }
        return {წითელი:+მთხვ[1], მწვანე:+მთხვ[2], ლურჯი:+მთხვ[3]}
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