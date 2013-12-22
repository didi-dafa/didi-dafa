window.onresize = function() {
    დაფა.დაალაგე()
}

var საც=new საცხობი(),
    დაკავშირებული=true,
    ბოლო_ნაქნარის_დრო,
    დაჭერილი=false

function რაც_მიჭირავს(){
    if(საც.მიჭირავს=='ხელი'){
        return ხელი
    }
    return ფუნჯი
}

var თარგმანი={}
function მომე_თარგმანი(გასაღები, ალტერნატივა){
    if(თარგმანი[გასაღები]){
        return თარგმანი[გასაღები]
    }
    if(ალტერნატივა){
        return ალტერნატივა
    }
    return გასაღები
}
function განაახლე_თარგმანი(){
    გააგზავნე('/მომე-თარგმანი?ენა='+საც.ენა, function(თარგ){
        თარგმანი=JSON.parse(თარგ)
        
        var სათარგმნი = document.querySelectorAll('[data-თარგმანი]')
        for(var ს in სათარგმნი){
            var ელ = სათარგმნი[ს]
            
            if(!(ელ instanceof Element)){
                continue
            }
            
            var თარგ = მომე_თარგმანი(ელ.attributes['data-თარგმანი'].value)
            if(ელ.value){
                ელ.value=თარგ
            }else{
                ელ.removeChild(ელ.firstChild)
                ელ.appendChild(document.createTextNode(თარგ))
            }
        }
    })
}
function შეცვალე_ენა(ენა){
    საც.მიე_ენა(ენა)
    განაახლე_თარგმანი()
}

განაახლე_თარგმანი()


function მითხარი_ხოლმე_რაც_მოხდება() {
    var მოთხოვნა = new XMLHttpRequest()

    function ახალი_მოთხოვნა() {
        მოთხოვნა.onreadystatechange = function() {
            if (მოთხოვნა.readyState == 4) {
                if (მოთხოვნა.status == 200) {
                    if(!მოთხოვნა.response){
                        სცადე_მოგვიანებით()
                        return
                    }
                    if(მოთხოვნა.response=='გამოცოცხლდი'){
                        ახალი_მოთხოვნა()
                        return
                    }
                    var ნაქნარები = JSON.parse(მოთხოვნა.response)
                    ბოლო_ნაქნარის_დრო = ნაქნარები[ნაქნარები.length - 1].დრო
                    ახალი_მოთხოვნა()
                    
                    დაამუშავე_მოსული_ნაქნარები(ნაქნარები)
                }else if(მოთხოვნა.status==504){
                    ახალი_მოთხოვნა()
                }else{
                    სცადე_მოგვიანებით()
                }
            }
            
            
        }
        მოთხოვნა.open("GET", '/რა-მოხდა?როდიდან=' + ბოლო_ნაქნარის_დრო, true)
        მოთხოვნა.setRequestHeader("Cache-Control","no-cache")
        მოთხოვნა.setRequestHeader("Pragma","no-cache")
        მოთხოვნა.send()
        
        function სცადე_მოგვიანებით(){
            // კავშირი გაწყდა
            დაკავშირებული=false
            გადააფარე_ლაბი()
            
            setTimeout(function(){
                გააგზავნე('/ცდა', function(პას, შეც){
                    if(შეც){
                        სცადე_მოგვიანებით()
                    }else{
                        დაკავშირებული=true
                        გააგზავნე('/', function(){
                            // კავშირი აღდგა. ყველაფერი გასაახლებელია.
                            მომხმარებლები={}
                            განაახლე_მომხმარებლები()
                            დაფა.მთლიანად_გადახატე()
                            მოხსენი_ლაბი()
                            
                            ახალი_მოთხოვნა()
                        })
                    }
                })
            }, 2000)
        }
    }

    ახალი_მოთხოვნა()
}

function დაამუშავე_მოსული_ნაქნარები(ნაქნარები){
    for (var ნ in ნაქნარები) {
        var ნაქნარი = ნაქნარები[ნ]
        if(ნაქნარი.ტიპი=='დავხატე'){
            var მომხმარებელი = მომხმარებლები[ნაქნარი.მქმნელი]
            if(!მომხმარებელი){
                continue
            }
            მომხმარებელი.მიე_ხატავს()
            განაახლე_მომხმარებლების_სია()
            if(ნაქნარი.მონაცემები){
                დაფა.გადაახატე(ნაქნარი.მონაცემები)
            }
        }else if(ნაქნარი.ტიპი=='სახელი შევიცვალე'){
            var მომხმარებელი = მომხმარებლები[ნაქნარი.მქმნელი]
            if(!მომხმარებელი){
                continue
            }
            მომხმარებელი.სახელი=ნაქნარი.მონაცემები
            განაახლე_მომხმარებლების_სია()
        }else if(ნაქნარი.ტიპი=='შემოვედი'){
            მომხმარებლები[ნაქნარი.მქმნელი]=ნაქნარი.მონაცემები
            განაახლე_მომხმარებლების_სია()
        }else if(ნაქნარი.ტიპი=='გავედი'){
            delete მომხმარებლები[ნაქნარი.მქმნელი]
            განაახლე_მომხმარებლების_სია()
        }else if(ნაქნარი.ტიპი=='წავნაცვლდი'){
            var მომხმარებელი = მომხმარებლები[ნაქნარი.მქმნელი]
            if(!მომხმარებელი){
                continue
            }
            მომხმარებელი.მიე_დადის()
            განაახლე_მომხმარებლების_სია()
            
            მომხმარებელი.ხედვის_არე=ნაქნარი.მონაცემები
            მომხმარებელი.შუაწერტილი={
                ხ:Math.floor(მომხმარებელი.ხედვის_არე.ხ+
                        მომხმარებელი.ხედვის_არე.სიგანე/2),
                ჯ:Math.floor(მომხმარებელი.ხედვის_არე.ჯ+
                        მომხმარებელი.ხედვის_არე.სიმაღლე/2),
            }
        }else if(ნაქნარი.ტიპი=='ფერი შევიცვალე'){
            var მომხმარებელი = მომხმარებლები[ნაქნარი.მქმნელი]
            if(!მომხმარებელი){
                continue
            }
            მომხმარებელი.ფერი=ნაქნარი.მონაცემები
            განაახლე_მომხმარებლების_სია()
        }else if(ნაქნარი.ტიპი=='სისქე შევიცვალე'){
            var მომხმარებელი = მომხმარებლები[ნაქნარი.მქმნელი]
            if(!მომხმარებელი){
                continue
            }
            მომხმარებელი.სისქე=ნაქნარი.მონაცემები
            განაახლე_მომხმარებლების_სია()
        }
    }
}

function გააგზავნე_ობიექტი(მისამართზე, ობიექტი) {
    var მოთხოვნა = new XMLHttpRequest()
    მოთხოვნა.open("POST", მისამართზე, true)
    მოთხოვნა.setRequestHeader("Cache-Control","no-cache")
    მოთხოვნა.setRequestHeader("Pragma","no-cache")
    მოთხოვნა.send(JSON.stringify(ობიექტი))
}

function გააგზავნე(მისამართზე, უკუძახილი) {
    var მოთხოვნა = new XMLHttpRequest()
    if (უკუძახილი) {
        მოთხოვნა.onreadystatechange = function() {
            if (მოთხოვნა.readyState == 4){
                if(მოთხოვნა.status == 200) {
                    უკუძახილი(მოთხოვნა.response)
                }else{
                    უკუძახილი(null, true)
                }
            }
        }
    }
    მოთხოვნა.open("GET", მისამართზე, true)
    მოთხოვნა.setRequestHeader("Cache-Control","no-cache")
    მოთხოვნა.setRequestHeader("Pragma","no-cache")
    მოთხოვნა.send()
}

function თქვი_რომ_წავნაცვლდი() {
    გააგზავნე_ობიექტი('/ვქენი', {
            ტიპი:'წავნაცვლდი',
            მონაცემები:{
                ხ:დაფა.გლობ_ხ,
                ჯ:დაფა.გლობ_ჯ,
                სიგანე:დაფა.ნახაზი.width,
                სიმაღლე:დაფა.ნახაზი.height,
            }
        })
}
function თქვი_რომ_ფერი_შევიცვალე(){
    გააგზავნე_ობიექტი('/ვქენი', {
            ტიპი:'ფერი შევიცვალე',
            მონაცემები:საც.ფერი
        })
}
function თქვი_რომ_სისქე_შევიცვალე(){
    გააგზავნე_ობიექტი('/ვქენი', {
            ტიპი:'სისქე შევიცვალე',
            მონაცემები:საც.სისქე
        })
}

var ლაბი = document.getElementById('ლაბი')

function გადააფარე_ლაბი(){
    ლაბი.className = ""
}

function მოხსენი_ლაბი(){
    ლაბი.className = "დამალული"
}

var დაფა = function() {
    var ეს = {
        კანტი: {ხ: 512, ჯ: 512},
        წანაცვლების_ჯამი: {მარცხ_ხ: 0, მარჯვ_ხ:0, ზედა_ჯ:0, ქვედა_ჯ: 0},
        დაალაგე: function() {
            this.ნახაზი.width = window.innerWidth + this.კანტი.ხ * 2
            this.ნახაზი.height = window.innerHeight + this.კანტი.ჯ * 2
            this.ალტ_ნახაზი.width=this.ნახაზი.width
            this.ალტ_ნახაზი.height=this.ნახაზი.height
            this.მთლიანად_გადახატე()
            this.გააახლეკურსორი()
        },
        მთლიანად_გადახატე:function(){
            this.გამოთვალე_კოორდინატები()
            this.განაახლე_ფრაგმენტი(0,0, this.ნახაზი.width, this.ნახაზი.height)
        },
        განაახლე_ფრაგმენტი: function(ხ, ჯ, სიგანე, სიმაღლე){
            var გლობ=დაფა.მომე_გლობალური_კოორდინატები(ხ, ჯ)
            var სურათი = document.createElement('img')
            სურათი.src = '/მომე-ფრაგმენტი?ხ=' + გლობ.ხ + '&ჯ=' + გლობ.ჯ + 
                    '&სიგანე=' + სიგანე + '&სიმაღლე=' + სიმაღლე + 
                    '&შ=' + Math.random()
            
            სურათი.onload=function(გ_ხ, გ_ჯ, სიგ, სიმ){
                // თუ ჩამოტვირთვისას გადანაცვლება მოასწრო, 
                // უნდა შევავსოთ შესაბამისად
                return function(){
                    var ლოკ = დაფა.მომე_ლოკალური_კოორდინატები(გ_ხ, გ_ჯ)
                    დაფა.კონტ.drawImage(სურათი,0,0,სიგ, სიმ, 
                    ლოკ.ხ, 
                    ლოკ.ჯ,
                    სიგ, სიმ)
                }
            }(გლობ.ხ, გლობ.ჯ, სიგანე, სიმაღლე)
        },
        გამოთვალე_კოორდინატები: function() {
            this.გლობ_ხ = საც.ხ - Math.floor(this.ნახაზი.width / 2),
                    this.გლობ_ჯ = საც.ჯ - Math.floor(this.ნახაზი.height / 2)
        },
        წანაცვლდი: function(ხ_ცვლილება, ჯ_ცვლილება) {
            საც.ხ += ხ_ცვლილება
            საც.ჯ += ჯ_ცვლილება
            
            განაახლე_მდებარეობა()
            
            var ხ=0,ჯ=0,ჩასასმელი_ხ=0, ჩასასმელი_ჯ=0,
                სიგ=this.ნახაზი.width-Math.abs(ხ_ცვლილება),
                სიმ=this.ნახაზი.height-Math.abs(ჯ_ცვლილება)
        
            if(ხ_ცვლილება>0){
                ხ=ხ_ცვლილება
            }else{
                ჩასასმელი_ხ=-ხ_ცვლილება
            }
            if(ჯ_ცვლილება>0){
                ჯ=ჯ_ცვლილება
            }else{
                ჩასასმელი_ჯ=-ჯ_ცვლილება
            }
            
            this.ალტ_კონტ.drawImage(this.ნახაზი,
                    ხ, ჯ, სიგ, სიმ,
                    ჩასასმელი_ხ,ჩასასმელი_ჯ,სიგ, სიმ)
            
            this.კონტ.drawImage(this.ალტ_ნახაზი,0,0, this.ნახაზი.width, this.ნახაზი.height)

            // გვერდების გასუფთავება
            this.ალტ_კონტ.fillStyle='#ffffff'
            this.ალტ_კონტ.fillRect(0,0,this.ნახაზი.width, this.ნახაზი.height)
            
            this.გამოთვალე_კოორდინატები()

            // ცარიელი გვერდების შევსება
            this.წანაცვლების_ჯამი.მარცხ_ხ += ხ_ცვლილება
            this.წანაცვლების_ჯამი.მარჯვ_ხ += ხ_ცვლილება
            this.წანაცვლების_ჯამი.ზედა_ჯ += ჯ_ცვლილება
            this.წანაცვლების_ჯამი.ქვედა_ჯ += ჯ_ცვლილება
            
            if(this.წანაცვლების_ჯამი.მარცხ_ხ>0){
                this.წანაცვლების_ჯამი.მარცხ_ხ=0
            }
            if(this.წანაცვლების_ჯამი.მარჯვ_ხ<0){
                this.წანაცვლების_ჯამი.მარჯვ_ხ=0
            }
            
            if(this.წანაცვლების_ჯამი.ზედა_ჯ>0){
                this.წანაცვლების_ჯამი.ზედა_ჯ=0
            }
            if(this.წანაცვლების_ჯამი.ქვედა_ჯ<0){
                this.წანაცვლების_ჯამი.ქვედა_ჯ=0
            }
            
            // ხ-ები
            if (this.წანაცვლების_ჯამი.მარცხ_ხ < -100) {
                var ხ,
                    ჯ,
                    სიგანე,
                    სიმაღლე
        
                სიგანე = Math.abs(this.წანაცვლების_ჯამი.მარცხ_ხ)
                სიმაღლე = this.ნახაზი.height
                ჯ = 0
                ხ=0
                
                this.განაახლე_ფრაგმენტი(ხ,
                    ჯ, სიგანე,
                    სიმაღლე)
                    
                this.წანაცვლების_ჯამი.მარცხ_ხ=0
            }
            if (this.წანაცვლების_ჯამი.მარჯვ_ხ > 100) {
                var ხ,
                    ჯ,
                    სიგანე,
                    სიმაღლე
        
                სიგანე = Math.abs(this.წანაცვლების_ჯამი.მარჯვ_ხ)
                სიმაღლე = this.ნახაზი.height
                ჯ = 0
                ხ=this.ნახაზი.width - this.წანაცვლების_ჯამი.მარჯვ_ხ
                
                this.განაახლე_ფრაგმენტი(ხ,
                    ჯ, სიგანე,
                    სიმაღლე)
                    
                this.წანაცვლების_ჯამი.მარჯვ_ხ=0
            }
            
            // ჯ-ები
            if (this.წანაცვლების_ჯამი.ზედა_ჯ < -100) {
                var ხ,
                    ჯ,
                    სიგანე,
                    სიმაღლე
        
                სიგანე = this.ნახაზი.width
                სიმაღლე = Math.abs(this.წანაცვლების_ჯამი.ზედა_ჯ)
                ხ = 0
                ჯ = 0
                
                this.განაახლე_ფრაგმენტი(ხ,
                    ჯ, სიგანე,
                    სიმაღლე)
                    
                this.წანაცვლების_ჯამი.ზედა_ჯ=0
            }
            if (this.წანაცვლების_ჯამი.ქვედა_ჯ > 100) {
                var ხ,
                    ჯ,
                    სიგანე,
                    სიმაღლე
                
                სიგანე = this.ნახაზი.width
                სიმაღლე = Math.abs(this.წანაცვლების_ჯამი.ქვედა_ჯ)
                ხ = 0
                ჯ = this.ნახაზი.height - this.წანაცვლების_ჯამი.ქვედა_ჯ
                
                this.განაახლე_ფრაგმენტი(ხ,
                    ჯ, სიგანე,
                    სიმაღლე)
                    
                this.წანაცვლების_ჯამი.ქვედა_ჯ=0
            }
        },
        გადაახატე: function(ნაქნარი, ინდექსი, წინები) {
            var გზა=ნაქნარი.გზა
            
            
            if (!ინდექსი&&ინდექსი!==0) {
                ინდექსი = 0
            }
            var ნაფეხური = გზა[ინდექსი],
                ლოკ = დაფა.მომე_ლოკალური_კოორდინატები(ნაფეხური.ხ, ნაფეხური.ჯ)
            
            წინები = this.გაუსვი_ხაზი(ლოკ.ხ, ლოკ.ჯ, 
                ნაქნარი.ფერი, ნაქნარი.სისქე, წინები)

            // ეს ნიშნავს ბოლო ჩანაწერს
            if (!ნაფეხური.დრო && ნაფეხური.დრო!==0) {
                return
            }

            var ეს = this
            setTimeout(function() {
                ეს.გადაახატე(ნაქნარი, ++ინდექსი, წინები)
            }, ნაფეხური.დრო)
        },
        გააახლეკურსორი: function() {
            if (საც.მიჭირავს === 'ხელი') {
                დაფა.ნახაზი.style.cursor = 'pointer'
            } else {
                დაფა.ნახაზი.style.cursor = 'auto'
            }
        },
        მომე_გლობალური_კოორდინატები: function(ლოკალური_ხ, ლოკალური_ჯ) {
            return {ხ: დაფა.გლობ_ხ + ლოკალური_ხ, ჯ: დაფა.გლობ_ჯ + ლოკალური_ჯ}
        },
        მომე_გლობალური_კოორდინატები_ეკრანიდან: function(ლოკალური_ხ, ლოკალური_ჯ) {
            return {ხ: დაფა.გლობ_ხ + დაფა.კანტი.ხ + ლოკალური_ხ, 
                ჯ: დაფა.გლობ_ჯ + დაფა.კანტი.ჯ + ლოკალური_ჯ}
        },
        მომე_ლოკალური_კოორდინატები:function(გლობალური_ხ, გლობალური_ჯ) {
            return {ხ: გლობალური_ხ - დაფა.გლობ_ხ, ჯ: გლობალური_ჯ - დაფა.გლობ_ჯ}
        },
        გაუსვი_ხაზი:function(ხ,ჯ, ფერი, სისქე, წინები){
            if(!წინები){
                return [{ხ:ხ,ჯ:ჯ}]
            }
            var წინა0 = წინები[0]
            
            წინები[0]={ხ:ხ, ჯ:ჯ}
            
            this.კონტ.strokeStyle=ფერი
            this.კონტ.lineWidth=სისქე
            this.კონტ.lineCap="round"
            this.კონტ.beginPath()
            this.კონტ.moveTo(წინა0.ხ, წინა0.ჯ)
            this.კონტ.lineTo(ხ, ჯ)
            this.კონტ.stroke()

            return წინები
        },
    }

    ეს.ნახაზი = document.getElementById('დაფა')
    ეს.კონტ = ეს.ნახაზი.getContext('2d')
    
    ეს.ალტ_ნახაზი = document.createElement('canvas')
    ეს.ალტ_კონტ = ეს.ალტ_ნახაზი.getContext('2d')
    
    გააგზავნე("/რა-დროა", function(დრო){
        ბოლო_ნაქნარის_დრო=დრო
        მითხარი_ხოლმე_რაც_მოხდება()
    })

    ეს.ნახაზი.addEventListener('mousedown', function(მოვლ){
        if (მოვლ.button===0) {
            დაჭერილი=true
            რაც_მიჭირავს().დაიწყე(მოვლ.clientX, მოვლ.clientY)
        }
    })
    ეს.ნახაზი.addEventListener('mousemove', function(მოვლ){
        if (მოვლ.button===0) {
            რაც_მიჭირავს().გაამოძრავე(მოვლ.clientX, მოვლ.clientY)
        }
    })
    ეს.ნახაზი.addEventListener('mouseup', function(მოვლ){
        if (მოვლ.button===0) {
            დაჭერილი=false
            რაც_მიჭირავს().დაასრულე(მოვლ.clientX, მოვლ.clientY)
        }
    })
    ეს.ნახაზი.addEventListener('mouseleave', function(მოვლ){
        if (დაჭერილი&&მოვლ.button===0) {
            დაჭერილი=false
            რაც_მიჭირავს().დაასრულე(მოვლ.clientX, მოვლ.clientY)
        }
    })
    
    ეს.ნახაზი.oncontextmenu = function() {
        if(საც.მიჭირავს == 'ხელი'){
            საც.მიე_მიჭირავს('ფუნჯი')
        }else{
            საც.მიე_მიჭირავს('ხელი')
        }
        ეს.გააახლეკურსორი();
        return false
    }

    return ეს
}()

var ფუნჯი = {
    იხატება: false,
    გზას_მიუმატე: function(ხ, ჯ) {
        var გლობ = დაფა.მომე_გლობალური_კოორდინატები_ეკრანიდან(ხ, ჯ)
        this.გზა.push({ხ: გლობ.ხ, ჯ: გლობ.ჯ, 
            დრო: new Date().getTime()})
    },
    დაიწყე: function(ხ, ჯ) {
        this.იხატება = true
        this.წინები= დაფა.გაუსვი_ხაზი(დაფა.კანტი.ხ + ხ, დაფა.კანტი.ჯ + ჯ, 
                საც.ფერი, საც.სისქე)

        this.გზა = []
        this.გზას_მიუმატე(ხ, ჯ)
    },
    გაამოძრავე: function(ხ, ჯ) {
        if (this.იხატება) {
            this.წინები = დაფა.გაუსვი_ხაზი(დაფა.კანტი.ხ + ხ, დაფა.კანტი.ჯ + ჯ, 
                საც.ფერი, საც.სისქე, this.წინები)

            this.გზას_მიუმატე(ხ, ჯ)
        }
    },
    დაასრულე: function(ხ, ჯ) {
        this.იხატება = false

        var გასაგზავნი_გზა = []
        for (var ი = 0; ი < this.გზა.length - 1; ი++) {
            var ესგზა = this.გზა[ი]
            var მერეგზა = this.გზა[ი + 1]
            გასაგზავნი_გზა.push({
                ხ: ესგზა.ხ,
                ჯ: ესგზა.ჯ,
                დრო: მერეგზა.დრო - ესგზა.დრო
            })
        }
        var გზისბოლო = this.გზა[this.გზა.length - 1]
        გასაგზავნი_გზა.push({
            ხ: გზისბოლო.ხ,
            ჯ: გზისბოლო.ჯ,
        })
        გააგზავნე_ობიექტი('/ვქენი', {
            ტიპი:'დავხატე',
            მონაცემები:{
                გზა:გასაგზავნი_გზა,
                ფერი:საც.ფერი,
                სისქე:საც.სისქე,
            }
        })
    },
}

var ხელი = {
    გადამაქვს: false,
    დაიწყე: function(ხ, ჯ) {
        this.გადამაქვს = true
        this.წინა = {ხ: ხ, ჯ: ჯ}
    },
    გაამოძრავე: function(ხ, ჯ) {
        if (this.გადამაქვს) {
            var ხ_ცვლილება = this.წინა.ხ - ხ,
                    ჯ_ცვლილება = this.წინა.ჯ - ჯ 

            დაფა.წანაცვლდი(ხ_ცვლილება, ჯ_ცვლილება)

            this.წინა = {ხ: ხ, ჯ: ჯ}
        }
    },
    დაასრულე: function(ხ, ჯ) {
        this.გადამაქვს = false

        თქვი_რომ_წავნაცვლდი()
        საც.შეინახე_მდებარეობა()
        განაახლე_მომხმარებლების_სია()
    },
}

დაფა.დაალაგე()
თქვი_რომ_წავნაცვლდი()
თქვი_რომ_ფერი_შევიცვალე()