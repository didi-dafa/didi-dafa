window.onresize=function(){
    დაფა.width=window.innerWidth
    დაფა.height=window.innerHeight
}

var დაფა = document.getElementById('დაფა')
დაფა.width=window.innerWidth
დაფა.height=window.innerHeight
var კონტ = დაფა.getContext('2d')

var საცავი = {
    ნაწყვეტები:{},
    მომე_სურათი: function(პოზიცია, სიგრძე, სიგანე){
        
    }
}

function გააგზავნე(მისამართზე, ობიექტი){
    var მოთხოვნა = new XMLHttpRequest();
    მოთხოვნა.open("POST", მისამართზე, true);
    მოთხოვნა.send(ობიექტი);
}

var ფუნჯი = {
    კონტ:კონტ,
    იხატება: false,
    დაიწყე: function(ხ, ჯ){
        this.იხატება=true
        this.კონტ.beginPath()
        this.კონტ.moveTo(ხ, ჯ)
        this.გზა=[{ხ:ხ,ჯ:ჯ,დრო:new Date().getTime()}]
    },
    გაამოძრავე: function(ხ, ჯ){
        if(this.იხატება){
            this.კონტ.lineTo(ხ,ჯ)
            this.კონტ.stroke()
            this.გზა.push({ხ:ხ,ჯ:ჯ,დრო:new Date().getTime()})
        }
    },
    დაასრულე: function(ხ, ჯ){
        this.იხატება=false
        this.გზა.push({ხ:ხ,ჯ:ჯ,დრო:new Date().getTime()})
        // გასაკეთებელია
        var გასაგზავნი_გზა=[]
        for(var i=0;i<this.გზა.length-1;i++){
            var ესგზა=this.გზა[i]
            var მერეგზა=this.გზა[i+1]
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