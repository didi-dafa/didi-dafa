window.onresize=function(){
    დაფა.width=window.innerWidth
    დაფა.height=window.innerHeight
}

var დაფა = document.getElementById('დაფა')
დაფა.width=window.innerWidth
დაფა.height=window.innerHeight
var კონტ = დაფა.getContext('2d')

var გლობალური_ხ=0, გლობალური_ჯ=0,
    დაფის_გლობ_ხ=გლობალური_ხ-დაფა.width/2,
    დაფის_გლობ_ჯ=გლობალური_ჯ-დაფა.height/2

var საცავი = {
    ნაწყვეტები:{},
    მომე_სურათი: function(პოზიცია, სიგრძე, სიგანე){
        
    }
}

function მომე_გლობალური_კოორდინატები(ლოკალური_ხ, ლოკალური_ჯ){
    return {ხ:დაფის_გლობ_ხ+ლოკალური_ხ, ჯ:დაფის_გლობ_ჯ+ლოკალური_ჯ}
}
function მომე_ლოკალური_კოორდინატები(გლობალური_ხ, გლობალური_ჯ){
}

function გააგზავნე(მისამართზე, ობიექტი){
    var მოთხოვნა = new XMLHttpRequest();
    მოთხოვნა.open("POST", მისამართზე, true);
    მოთხოვნა.send(ობიექტი);
}

var ფუნჯი = {
    კონტ:კონტ,
    იხატება: false,
    გზას_მიუმატე:function(ხ,ჯ){
        var გლობ=მომე_გლობალური_კოორდინატები(ხ,ჯ)
        this.გზა.push({ხ:გლობ.ხ,ჯ:გლობ.ჯ,დრო:new Date().getTime()})
    },
    დაიწყე: function(ხ, ჯ){
        this.იხატება=true
        this.კონტ.beginPath()
        this.კონტ.moveTo(ხ, ჯ)
        this.გზა=[]
        this.გზას_მიუმატე(ხ,ჯ)
    },
    გაამოძრავე: function(ხ, ჯ){
        if(this.იხატება){
            this.კონტ.lineTo(ხ,ჯ)
            this.კონტ.stroke()
            this.გზას_მიუმატე(ხ,ჯ)
        }
    },
    დაასრულე: function(ხ, ჯ){
        this.იხატება=false
        this.გზას_მიუმატე(ხ,ჯ)
        
        var გასაგზავნი_გზა=[]
        for(var ი=0;ი<this.გზა.length-1;ი++){
            var ესგზა=this.გზა[ი]
            var მერეგზა=this.გზა[ი+1]
            გასაგზავნი_გზა.push({
                ხ:ესგზა.ხ, 
                ჯ:ესგზა.ჯ, 
                დრო:მერეგზა.დრო-ესგზა.დრო
            })
        }
        var გზისბოლო=this.გზა[this.გზა.length-1]
        გასაგზავნი_გზა.push({
                ხ:გზისბოლო.ხ, 
                ჯ:გზისბოლო.ჯ
            })
            
        console.log(გასაგზავნი_გზა)
        გააგზავნე('/ვქენი', JSON.stringify(გასაგზავნი_გზა))
    },
}

var ხელი = {
    კონტ:კონტ,
    გადამაქვს: false,
    დაიწყე: function(ხ, ჯ){
        this.გადამაქვს=true
    },
    გაამოძრავე: function(ხ, ჯ){
        if(this.გადამაქვს){
            var სურათი = this.კონტ.getImageData(1, 0, 
                this.კონტ.canvas.width, this.კონტ.canvas.height);
            this.კონტ.putImageData(imageData, 0, 0);
            console.log(სურათი)
        }
    },
    დაასრულე: function(ხ, ჯ){
        this.გადამაქვს=false
    },
}

var მიჭირავს=ფუნჯი

დაფა.onmousedown=function(მოვლ){
    მიჭირავს.დაიწყე(მოვლ.clientX, მოვლ.clientY)
}
დაფა.onmousemove=function (მოვლ){
    მიჭირავს.გაამოძრავე(მოვლ.clientX, მოვლ.clientY)
}
დაფა.onmouseup=function (მოვლ){
    მიჭირავს.დაასრულე(მოვლ.clientX, მოვლ.clientY)
}
დაფა.oncontextmenu=function(){
    მიჭირავს=მიჭირავს==ხელი?ფუნჯი:ხელი
    return false
}