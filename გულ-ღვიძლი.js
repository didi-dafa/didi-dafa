window.onresize = function() {
    დაფა.დაალაგე()
}

var გლობალური_ხ = 0, გლობალური_ჯ = 0

function მითხარი_ხოლმე_რაც_მოხდება(ბოლო_ნაქნარის_დრო) {
    var მოთხოვნა = new XMLHttpRequest()

    function ახალი_მოთხოვნა() {
        მოთხოვნა.onreadystatechange = function() {
            if (მოთხოვნა.readyState == 4) {
                if (მოთხოვნა.status == 200) {
                    var ნაქნარები = JSON.parse(მოთხოვნა.response)
                    ბოლო_ნაქნარის_დრო = ნაქნარები[ნაქნარები.length - 1].დრო
                    ახალი_მოთხოვნა()
                    დაფა.ყველა_გადაახატე(ნაქნარები)
                }
            }
        }
        მოთხოვნა.open("GET", '/რა-მოხდა?როდიდან=' + ბოლო_ნაქნარის_დრო + '&r=' + Math.random(), true)
        მოთხოვნა.send()
    }

    ახალი_მოთხოვნა()
}

function გააგზავნე_ობიექტი(მისამართზე, ობიექტი) {
    var მოთხოვნა = new XMLHttpRequest()
    მოთხოვნა.open("POST", მისამართზე, true)
    მოთხოვნა.send(ობიექტი)
}

function გააგზავნე(მისამართზე, უკუძახილი) {
    var მოთხოვნა = new XMLHttpRequest()
    if (უკუძახილი) {
        მოთხოვნა.onreadystatechange = function() {
            if (მოთხოვნა.readyState == 4 && მოთხოვნა.status == 200) {
                უკუძახილი(მოთხოვნა.response)
            }
        }
    }
    მოთხოვნა.open("GET", მისამართზე, true)
    მოთხოვნა.send()
}

function თქვი_რომ_წავნაცვლდი() {
    გააგზავნე('/წავნაცვლდი?ხ=' + დაფა.გლობ_ხ + '&ჯ=' + დაფა.გლობ_ჯ +
            '&სიგანე=' + დაფა.ნახაზი.width + '&სიმაღლე=' + დაფა.ნახაზი.height)
}

function მომე_გლობალური_კოორდინატები(ლოკალური_ხ, ლოკალური_ჯ) {
    return {ხ: დაფა.გლობ_ხ + დაფა.კანტი.ხ + ლოკალური_ხ, ჯ: დაფა.გლობ_ჯ + დაფა.კანტი.ჯ + ლოკალური_ჯ}
}

function მომე_ლოკალური_კოორდინატები(გლობალური_ხ, გლობალური_ჯ) {
    return {ხ: გლობალური_ხ - დაფა.გლობ_ხ, ჯ: გლობალური_ჯ - დაფა.გლობ_ჯ}
}

var დაფა = function() {
    var that = {
        კანტი: {ხ: 512, ჯ: 512},
        წანაცვლების_ჯამი: {ხ: 0, ჯ: 0},
        დაალაგე: function() {
            this.ნახაზი.width = window.innerWidth + this.კანტი.ხ * 2
            this.ნახაზი.height = window.innerHeight + this.კანტი.ჯ * 2
            console.log(this.ნახაზი.width, this.ნახაზი.height)
            this.გამოთვალე_კოორდინატები()
            this.განაახლე_ფრაგმენტი(this.გლობ_ხ, this.გლობ_ჯ, 
                this.ნახაზი.width, this.ნახაზი.height)
        },
        განაახლე_ფრაგმენტი: function(ხ, ჯ, სიგანე, სიმაღლე){
            var სურათი = document.createElement('img')
            სურათი.src = '/მომე-ფრაგმენტი?ხ=' + ხ + '&ჯ=' + ჯ + '&სიგანე=' + სიგანე + 
                            '&სიმაღლე=' + სიმაღლე
            
            სურათი.onload=function(გ_ხ, გ_ჯ, სიგ, სიმ){
                // თუ ჩამოტვირთვისას გადანაცვლება მოასწრო, 
                // უნდა შევავსოთ შესაბამისად
                return function(){
                    დაფა.კონტ.drawImage(სურათი,0,0,სიგ, სიმ, 
                    დაფა.გლობ_ხ-გ_ხ, 
                    დაფა.გლობ_ჯ-გ_ჯ,
                    სიგ, სიმ)
                }
            }(ხ, ჯ, სიგანე, სიმაღლე)
        },
        გამოთვალე_კოორდინატები: function() {
            this.გლობ_ხ = გლობალური_ხ - Math.floor(this.ნახაზი.width / 2),
                    this.გლობ_ჯ = გლობალური_ჯ - Math.floor(this.ნახაზი.height / 2)
            console.log(this.გლობ_ხ, this.გლობ_ჯ, გლობალური_ხ, გლობალური_ჯ)
        },
        წანაცვლდი: function(ხ_ცვლილება, ჯ_ცვლილება) {
            გლობალური_ხ -= ხ_ცვლილება
            გლობალური_ჯ -= ჯ_ცვლილება

            var სურათი = this.კონტ.getImageData(-ხ_ცვლილება, -ჯ_ცვლილება,
                    this.ნახაზი.width, this.ნახაზი.height)
            this.კონტ.putImageData(სურათი, 0, 0)

            this.გამოთვალე_კოორდინატები()

            // ცარიელი გვერდების შევსება
            this.წანაცვლების_ჯამი.ხ -= ხ_ცვლილება
            this.წანაცვლების_ჯამი.ჯ -= ჯ_ცვლილება
            // ხ-სთვის და ჯ-სთვის გასაცალკევებელია
            if (Math.abs(this.წანაცვლების_ჯამი.ხ) > 100) {

                var ვერტ_ხ,
                        ვერტ_ჯ,
                        ვერტ_სიგანე,
                        ვერტ_სიმაღლე

                ვერტ_სიგანე = Math.abs(this.წანაცვლების_ჯამი.ხ)
                ვერტ_სიმაღლე = this.ნახაზი.height
                ვერტ_ჯ = 0
                if (this.წანაცვლების_ჯამი.ხ > 0) {
                    ვერტ_ხ = 0
                } else {
                    ვერტ_ხ = this.ნახაზი.width - this.წანაცვლების_ჯამი.ხ
                }

                console.log('ხ გვერდების შევსება',
                        ვერტ_ხ,
                        ვერტ_ჯ,
                        ვერტ_სიგანე,
                        ვერტ_სიმაღლე)

                this.განაახლე_ფრაგმენტი(ვერტ_ხ,
                    ვერტ_ჯ, ვერტ_სიგანე,
                    ვერტ_სიმაღლე)

                this.წანაცვლების_ჯამი.ხ = 0
            }
            if (Math.abs(this.წანაცვლების_ჯამი.ჯ) > 100) {
                var ჰორ_ხ,
                        ჰორ_ჯ,
                        ჰორ_სიგანე,
                        ჰორ_სიმაღლე

                ჰორ_სიგანე = this.ნახაზი.width
                ჰორ_სიმაღლე = Math.abs(this.წანაცვლების_ჯამი.ჯ)
                ჰორ_ხ = 0
                if (this.წანაცვლების_ჯამი.ჯ > 0) {
                    ჰორ_ჯ = 0
                } else {
                    ჰორ_ჯ = this.ნახაზი.height - this.წანაცვლების_ჯამი.ჯ
                }

                console.log('ჯ გვერდების შევსება',
                        ჰორ_ხ,
                        ჰორ_ჯ,
                        ჰორ_სიგანე,
                        ჰორ_სიმაღლე)
                        
                this.განაახლე_ფრაგმენტი(ჰორ_ხ,
                    ჰორ_ჯ, ჰორ_სიგანე,
                    ჰორ_სიმაღლე)

                this.წანაცვლების_ჯამი.ჯ = 0
            }
        },
        ყველა_გადაახატე: function(ნაქნარები) {
            for (var ნ in ნაქნარები) {
                this.გადაახატე(ნაქნარები[ნ])
            }
        },
        გადაახატე: function(ნაქნარი, ინდექსი) {
            if (!ინდექსი) {
                ინდექსი = 1
            }
            var ნაფეხური = ნაქნარი.გზა[ინდექსი],
                    წინა_ნაფეხური = ნაქნარი.გზა[ინდექსი - 1],
                    ლოკ1 = მომე_ლოკალური_კოორდინატები(ნაფეხური.ხ, ნაფეხური.ჯ),
                    ლოკ2 = მომე_ლოკალური_კოორდინატები(წინა_ნაფეხური.ხ, წინა_ნაფეხური.ჯ)

            this.კონტ.beginPath()
            this.კონტ.moveTo(ლოკ1.ხ, ლოკ1.ჯ)
            this.კონტ.lineTo(ლოკ2.ხ, ლოკ2.ჯ)
            this.კონტ.stroke()

            // ეს ნიშნავს ბოლო ჩანაწერს
            if (!ნაფეხური.დრო) {
                return
            }

            var that = this
            setTimeout(function() {
                that.გადაახატე(ნაქნარი, ++ინდექსი)
            }, ნაფეხური.დრო)
        },
        გააახლეკურსორი: function() {
            if (მიჭირავს === ხელი) {
                document.body.style.cursor = 'pointer'
            } else {
                document.body.style.cursor = 'auto'
            }
        }
    }

    that.ნახაზი = document.getElementById('დაფა')
    that.კონტ = that.ნახაზი.getContext('2d')
    
    გააგზავნე("/რა-დროა", function(დრო){
        მითხარი_ხოლმე_რაც_მოხდება(+დრო)
    })

    that.ნახაზი.onmousedown = function(მოვლ) {
        if (მიჭირავს) {
            მიჭირავს.დაიწყე(მოვლ.clientX, მოვლ.clientY)
        }
    }
    that.ნახაზი.onmousemove = function(მოვლ) {
        if (მიჭირავს) {
            მიჭირავს.გაამოძრავე(მოვლ.clientX, მოვლ.clientY)
        }
    }
    that.ნახაზი.onmouseup = function(მოვლ) {
        if (მიჭირავს) {
            მიჭირავს.დაასრულე(მოვლ.clientX, მოვლ.clientY)
        }
    }
    that.ნახაზი.oncontextmenu = function() {
        მიჭირავს = მიჭირავს == ხელი ? ფუნჯი : ხელი
        that.გააახლეკურსორი();
        return false
    }

    return that
}()

დაფა.დაალაგე()
თქვი_რომ_წავნაცვლდი()

var ფუნჯი = {
    იხატება: false,
    გზას_მიუმატე: function(ხ, ჯ) {
        var გლობ = მომე_გლობალური_კოორდინატები(ხ, ჯ)
        this.გზა.push({ხ: გლობ.ხ, ჯ: გლობ.ჯ, დრო: new Date().getTime()})
    },
    დაიწყე: function(ხ, ჯ) {
        this.იხატება = true

        დაფა.კონტ.beginPath()
        დაფა.კონტ.moveTo(დაფა.კანტი.ხ + ხ, დაფა.კანტი.ხ + ჯ)

        this.გზა = []
        this.გზას_მიუმატე(ხ, ჯ)
    },
    გაამოძრავე: function(ხ, ჯ) {
        if (this.იხატება) {
            დაფა.კონტ.lineTo(დაფა.კანტი.ხ + ხ, დაფა.კანტი.ხ + ჯ)
            დაფა.კონტ.stroke()

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
            ჯ: გზისბოლო.ჯ
        })
        გააგზავნე_ობიექტი('/ვქენი', JSON.stringify(გასაგზავნი_გზა))
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
            var ხ_ცვლილება = ხ - this.წინა.ხ,
                    ჯ_ცვლილება = ჯ - this.წინა.ჯ

            დაფა.წანაცვლდი(ხ_ცვლილება, ჯ_ცვლილება)

            this.წინა = {ხ: ხ, ჯ: ჯ}
        }
    },
    დაასრულე: function(ხ, ჯ) {
        this.გადამაქვს = false

        თქვი_რომ_წავნაცვლდი()
    },
}
var მიჭირავს = ფუნჯი
