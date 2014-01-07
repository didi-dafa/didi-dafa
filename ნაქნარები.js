var ფს = require('fs'),
        ნაქნარები = [],
        შეიცვალა = false

exports.დაამატე = function(მომხმარებელი, ნაქნარი) {
    var შესანახი_ნაქნარი = {
        დრო: new Date().getTime(),
        მქმნელი: მომხმარებელი.რიგის_ნომერი,
        სახელი: მომხმარებელი.სახელი,
        ხ: მომხმარებელი.ხედვის_არე.შუაწერტილი.ხ,
        ჯ: მომხმარებელი.ხედვის_არე.შუაწერტილი.ჯ,
        ტიპი: ნაქნარი.ტიპი,
        მონაცემები: ნაქნარი.მონაცემები,
    }
    შეიცვალა=true
    ნაქნარები.push(შესანახი_ნაქნარი)
    return სასხვისე(შესანახი_ნაქნარი)
}

function სასხვისე(ნაქნარი){
    return {
            დრო: ნაქნარი.დრო,
            მქმნელი: ნაქნარი.მქმნელი,
            ტიპი: ნაქნარი.ტიპი,
            მონაცემები: ნაქნარი.მონაცემები,
        }
}

exports.მომე = function(მომხმარებელი, როდიდან) {
    var გაფილტრულები=[]
    for(var ნ in ნაქნარები){
        var ნაქნარი = ნაქნარები[ნ]
        
        if(ნაქნარი.დრო <= როდიდან){
            continue
        }
        var გაფილტრული = exports.გაფილტრე(მომხმარებელი, ნაქნარი)
        if(გაფილტრული){
            გაფილტრულები.push(გაფილტრული)
        }
    }
    return გაფილტრულები
}

exports.მომე_ისტორია = function() {
    var გაფილტრულები=[]
    for(var ნ in ნაქნარები){
        var ნაქნარი = ნაქნარები[ნ]
        
        if(ნაქნარი.ტიპი=='დავხატე'){
            გაფილტრულები.push({
                    დრო: ნაქნარი.დრო,
                    სახელი: ნაქნარი.სახელი,
                    ფერი:ნაქნარი.მონაცემები.ფერი,
                    სისქე:ნაქნარი.მონაცემები.სისქე,
                    ხ:ნაქნარი.ხ,
                    ჯ: ნაქნარი.ჯ,
                })
        }
    }
    return გაფილტრულები
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
    return false
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
    if(მომხმარებელი.რიგის_ნომერი==ნაქნარი.მქმნელი){
        return
    }
    if(ნაქნარი.ტიპი=='დავხატე'){
        if(!exports.კვეთს_ხედვის_არეს(ნაქნარი, მომხმარებელი.ხედვის_არე)){
            return {
                დრო: ნაქნარი.დრო,
                მქმნელი: ნაქნარი.მქმნელი,
                ტიპი: ნაქნარი.ტიპი,
                მონაცემები:{
                    ფერი:ნაქნარი.მონაცემები.ფერი,
                    სისქე:ნაქნარი.მონაცემები.სისქე,
                },
            }
        }
    }
    return ნაქნარი
}

setInterval(function(){
    if(ნაქნარები.length<=1000){
        return 
    }
    
    ნაქნარები.splice(0, ნაქნარები.length-1000)
}, 5000)

function ჩატვირთე_შენახულები(){
    ფს.readFile('ნაქნარები.json', function(შეც, შიგთავსი){
        if(შეც) { console.log(შეც); return }
        ნაქნარები=JSON.parse(შიგთავსი)
    })
}

ჩატვირთე_შენახულები()

setInterval(function(){
    if(!შეიცვალა){
        return
    }
    შეიცვალა=false
    ფს.writeFile('ნაქნარები.json', JSON.stringify(ნაქნარები), function(შეც){
            if(შეც) { console.log(შეც) }
        })
}, 5000)