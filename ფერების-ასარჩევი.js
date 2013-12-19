var საფერე = function(ელემენტი, საწყისი_ფერი, უკუძახილი){
    var ნახაზი = document.createElement('canvas')
          
    ნახაზი.width = 200
    ნახაზი.height = 100
    
    var კონტ = ნახაზი.getContext('2d'),
        სურათი = კონტ.createImageData(ნახაზი.width, ნახაზი.height)
    
//    for(var ი=0;ი<ნახაზი.width;ი++){
//        for(var კ=0;კ<ნახაზი.height;კ++){
//            var მის = კ*ნახაზი.width*4 + ი*4
//            სურათი.data[მის]=255;
////            სურათი.data[მის+1]=255;
////            სურათი.data[მის+2]=255;
//        }
//    }
    
//    კონტ.putImageData(სურათი.data, 0,0);
    
    ელემენტი.appendChild(ნახაზი)
    
    return {}
}
function ჩასვი_ფერების_ასარჩევი(ელემენტი, საწყისი_ფერი, უკუძახილი){
    function ფერის_ნაწყვეტი(ფერი){
        var ელ = document.createElement('div')
        ელ.style.backgroundColor=ფერი
        ელ.className='ფერის_ყუთი'
        if(საწყისი_ფერი==ფერი){
            ელ.className+=' მონიშნული_ფერის_ყუთი'
        }
        
        ელ.onclick=function(){
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
    ჩარჩო.style.height='22px'
    
    var ფერის_ყუთები=[
        ფერის_ნაწყვეტი('#000000'),
        ფერის_ნაწყვეტი('#FF0000'),
        ფერის_ნაწყვეტი('#FFFF00'),
        ფერის_ნაწყვეტი('#00FF00'),
        ფერის_ნაწყვეტი('#00FFFF'),
        ფერის_ნაწყვეტი('#0000FF'),
        ფერის_ნაწყვეტი('#FFFFFF')]
    
    ფერის_ყუთები.forEach(function(ფერის_ყუთი){
        ჩარჩო.appendChild(ფერის_ყუთი)
    })
    
    ელემენტი.appendChild(ჩარჩო)
}