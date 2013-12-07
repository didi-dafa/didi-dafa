var ზტაე = '<!DOCTYPE html>'+
        '<html>'+
            '<head>'+
                '<link rel="stylesheet" href="/სახე.css">'+
            '</head>'+
            '<body>'+
                '<div id="მთავარი_ნაჭერი">'+
                '<canvas id="დაფა"">'+
                '</canvas>'+
                '<div id="სახარახურე">'+
                    '<div>'+
                        '<img alt="ლოგო" /><br/>'+
                        '<span data-თარგმანი="დიდი დაფა">'+
                        'დიდი დაფა'+
                        '</span>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანი="ენა">'+
                        'ენა'+
                        '</span>'+
                        '<select id="ენა">'+
                        '</select>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანი="სახელი">'+
                        'სახელი'+
                        '</span>'+
                        '<input  id="სახელი"/>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანი="მდებარეობა">'+
                        'მდებარეობა'+
                        '</span>'+
                        '<input  id="მდებარეობა_ხ" class="მდებარეობა"/>'+
                        '<input  id="მდებარეობა_ჯ" class="მდებარეობა"/>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანი="მომხმარებლები">'+
                        'მომხმარებლები'+
                        '</span>'+
                        '<select id="მომხმარებლები" multiple="multiple">'+
                        '</select>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანი="ფერები">'+
                        'ფერები'+
                        '</span>'+
                        '<div id="ფერები">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '</div>'+
                '<script type="text/javascript" src="/ფერების-ასარჩევი.js"></script>'+
                '<script type="text/javascript" src="/გულ-ღვიძლი.js"></script>'+
                '<script type="text/javascript" src="/სახარახურე.js"></script>'+
            '</body>'+
        '</html>'

exports.ჩაუშვი=function(მოთხ, პასუხ){
    პასუხ.end(ზტაე)
}
