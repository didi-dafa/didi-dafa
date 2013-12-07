function ჩასვი_ფერების_ასარჩევი(ელემენტი, საწყისი_ფერი, უკუძახილი){
    var არჩეული_ფერი = document.createElement('div')
    არჩეული_ფერი.style.width='100%'
    არჩეული_ფერი.style.height='20px'
    არჩეული_ფერი.style.position='absolute'
    არჩეული_ფერი.style.top='24px'
    არჩეული_ფერი.style.left='0'
    არჩეული_ფერი.style.border='1px solid'
    არჩეული_ფერი.style.borderColor='#56a7f1'
    არჩეული_ფერი.style.backgroundColor=საწყისი_ფერი
    
    function ფერის_ნაწყვეტი(ფერი, მარცხენა){
        var ელ = document.createElement('div')
        ელ.style.width='20px'
        ელ.style.height='20px'
        ელ.style.position='absolute'
        ელ.style.left=მარცხენა+'px'
        ელ.style.borderRadius='2px'
        ელ.style.border='1px solid'
        ელ.style.borderColor='#56a7f1'
        ელ.style.backgroundColor=ფერი
        
        ელ.onclick=function(){
            არჩეული_ფერი.style.backgroundColor=ფერი
            უკუძახილი(ფერი)
        }
        return ელ
    }
    
    var ჩარჩო = document.createElement('div')
    ჩარჩო.style.position='relative'
    ჩარჩო.style.height='42px'
    
    ჩარჩო.appendChild(ფერის_ნაწყვეტი('#000000', 0))
    ჩარჩო.appendChild(ფერის_ნაწყვეტი('#FF0000', 24))
    ჩარჩო.appendChild(ფერის_ნაწყვეტი('#00FF00', 48))
    ჩარჩო.appendChild(ფერის_ნაწყვეტი('#0000FF', 72))
    ჩარჩო.appendChild(ფერის_ნაწყვეტი('#FFFFFF', 96))
    ჩარჩო.appendChild(არჩეული_ფერი)
    ელემენტი.appendChild(ჩარჩო)
}