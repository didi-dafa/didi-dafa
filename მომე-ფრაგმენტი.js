exports.ჩაუშვი=function(მოთხ, პასუხ, მომხმარებელი, მოდულები){
    მოდულები.საცავი.მომე_ფრაგმენტი(
                მოთხ.პარამები.ხ,
                მოთხ.პარამები.ჯ,
                მოთხ.პარამები.სიგანე,
                მოთხ.პარამები.სიმაღლე,
                function(ფრაგ){
                    პასუხ.end(ფრაგ)
                })
            
} 
