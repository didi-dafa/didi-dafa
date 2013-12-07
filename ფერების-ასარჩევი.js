function ჩასვი_ფერების_ასარჩევი(ელემენტი, საწყისი_ფერი, უკუძახილი){
    function ფერის_ნაწყვეტი(ფერი, მარცხენა){
        var ელ = document.createElement('div')
        ელ.className='ფერის_ყუთი'
        ელ.style.left=მარცხენა+'px'
        ელ.style.backgroundColor=ფერი
        
        ელ.onclick=function(მოვლ){
            console.log(მოვლ, this)
            ფერის_ყუთები.forEach(function(ფერის_ყუთი){
                ფერის_ყუთი.className='ფერის_ყუთი'
            })
            ელ.className='ფერის_ყუთი მონიშნული_ფერის_ყუთი'
            უკუძახილი(ფერი)
        }
        return ელ
    }
    
    var ჩარჩო = document.createElement('div')
    ჩარჩო.style.position='relative'
    ჩარჩო.style.height='42px'
    
    var ფერის_ყუთები=[
        ფერის_ნაწყვეტი('#000000', 0),
        ფერის_ნაწყვეტი('#FF0000', 24),
        ფერის_ნაწყვეტი('#00FF00', 48),
        ფერის_ნაწყვეტი('#0000FF', 72),
        ფერის_ნაწყვეტი('#FFFFFF', 96)]
    
    ფერის_ყუთები.forEach(function(ფერის_ყუთი){
        ჩარჩო.appendChild(ფერის_ყუთი)
    })
    
    ელემენტი.appendChild(ჩარჩო)
}