var ნაქნარები = []
exports.დაამატე = function(მომხმარებელი, ნაქნარი) {
    var შეფუთული_ნაქნარი = {
        დრო: new Date().getTime(),
        მქმნელი: მომხმარებელი.რიგის_ნომერი,
        ტიპი: ნაქნარი.ტიპი,
        მონაცემები: ნაქნარი.მონაცემები,
    }
    ნაქნარები.push(შეფუთული_ნაქნარი)
    return შეფუთული_ნაქნარი
}

exports.მომე = function(მომხმარებელი, როდიდან) {
    var გაფილტრული=[]
    for(var ნ in ნაქნარები){
        var ნაქნარი = ნაქნარები[ნ]
        
        if(ნაქნარი.დრო <= როდიდან){
            continue
        }
        გაფილტრული.push(exports.გაფილტრე(მომხმარებელი, ნაქნარი))
    }
    return გაფილტრული
}

exports.კვეთს_ხედვის_არეს = function(ნაქნარი, ხედვის_არე) {
    var გზა = ნაქნარი.მონაცემები.გზა
    // ვგულისხმობთ, რომ ნაქნარი ხატვისაა
    for (var გ in გზა) {
        var ნაფეხური = გზა[გ]
        if (ნაფეხური.ხ >= ხედვის_არე.ხ &&
                ნაფეხური.ხ < ხედვის_არე.ხ + ხედვის_არე.სიგანე &&
                ნაფეხური.ჯ >= ხედვის_არე.ჯ &&
                ნაფეხური.ჯ < ხედვის_არე.ჯ + ხედვის_არე.სიმაღლე) {
            return true
        }
    }
    return  false
}

exports.ნახატი_სცდება_დაფის_საზღვრებს = function(ნაქნარი) {
    var გზა = ნაქნარი.მონაცემები.გზა
    for (var გ in გზა) {
        var ნაფეხური = გზა[გ]
        if (სცდება_საზღვრებს(ნაფეხური)) {
            return true
        }
    }
    return  false
}

exports.მდებარეობა_სცდება_დაფის_საზღვრებს = function(ნაქნარი) {
    return სცდება_საზღვრებს(ნაქნარი.მონაცემები);
}

function სცდება_საზღვრებს(მდებარეობა){
    return  მდებარეობა.ხ >= 2147483648 || მდებარეობა.ხ <= -2147483648 ||
                მდებარეობა.j >= 2147483648 || მდებარეობა.j <= -2147483648
}

exports.გაფილტრე = function(მომხმარებელი, ნაქნარი){
    if(ნაქნარი.ტიპი=='დავხატე'){
        if(!exports.კვეთს_ხედვის_არეს(ნაქნარი, მომხმარებელი.ხედვის_არე)){
            return {
                დრო: ნაქნარი.დრო,
                მქმნელი: ნაქნარი.მქმნელი,
                ტიპი: ნაქნარი.ტიპი,
            }
        }
    }
    return ნაქნარი
}

setInterval(function(){
    var ახლა = new Date().getTime()
    for(var ნ in ნაქნარები){
        var ნაქნარი = ნაქნარები[ნ]
        
        if(ნაქნარი.დრო+1000*60*15<ახლა){
            delete ნაქნარები[ნ]
        }
    }
}, 5000)