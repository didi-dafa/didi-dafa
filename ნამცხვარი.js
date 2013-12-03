exports.მომე=function(მოთხ, სახელი){
    var ნამცხვარი = მოთხ.headers.cookie
    if(!ნამცხვარი){
        return
    }
    
    var ნაჭერი = ნამცხვარი.match(encodeURIComponent(სახელი)+"=(.*);")
    if(!ნაჭერი){
        return 
    }
    return ნაჭერი[1]
}

exports.მიე=function(პასუხ, სახელი, მნიშვნელობა){
    
    var არსებული = პასუხ.getHeader('Set-Cookie'),
       მისაწერი = encodeURIComponent(სახელი)+'='+encodeURIComponent(მნიშვნელობა)
       
    if(!არსებული){
        პასუხ.setHeader('Set-Cookie', [მისაწერი])
    }else{
        არსებული.push(მისაწერი)
        პასუხ.setHeader('Set-Cookie', არსებული)
    }
}