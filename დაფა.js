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
                        '<span data-თარგმანის-გასაღები="დიდი დაფა">'+
                        'დიდი დაფა'+
                        '</span>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანის-გასაღები="ენა">'+
                        'ენა'+
                        '</span>'+
                        '<select id="ენა">'+
                        '</select>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანის-გასაღები="სახელი">'+
                        'სახელი'+
                        '</span>'+
                        '<input  id="სახელი"/>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანის-გასაღები="მდებარეობა">'+
                        'მდებარეობა'+
                        '</span>'+
                        '<input  id="მდებარეობა_ხ" class="მდებარეობა"/>'+
                        '<input  id="მდებარეობა_ჯ" class="მდებარეობა"/>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანის-გასაღები="მომხმარებლები">'+
                        'მომხმარებლები'+
                        '</span>'+
                        '<select id="მომხმარებლები" multiple="multiple">'+
                        '</select>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანის-გასაღები="ფერები">'+
                        'ფერები'+
                        '</span>'+
                    '</div>'+
                '</div>'+
                '</div>'+
                '<script type="text/javascript" src="/გულ-ღვიძლი.js"></script>'+
                '<script type="text/javascript" src="/სახარახურე.js"></script>'+
            '</body>'+
        '</html>'

exports.ჩაუშვი=function(მოთხ, პასუხ){
    პასუხ.end(ზტაე)
}
