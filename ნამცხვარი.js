exports.მომე=function(მოთხ, სახელი){
    var ნამცხვარი = მოთხ.headers.cookie
    if(!ნამცხვარი){
        return
    }
    
    var ნაჭერი = ნამცხვარი.match(encodeURIComponent(სახელი)+"=(.*?)(;|$)")
    if(!ნაჭერი){
        return 
    }
    return decodeURIComponent(ნაჭერი[1])
}

exports.მიე=function(პასუხ, სახელი, მნიშვნელობა, ვადა){
    var არსებული = პასუხ.getHeader('Set-Cookie'),
       მისაწერი = encodeURIComponent(სახელი)+'='+encodeURIComponent(მნიშვნელობა)
    
    if(ვადა){
        მისაწერი+='; '+new Date(ვადა).toUTCString()
    }
    
    if(!არსებული){
        პასუხ.setHeader('Set-Cookie', [მისაწერი])
    }else{
        არსებული.push(მისაწერი)
        პასუხ.setHeader('Set-Cookie', არსებული)
    }
}