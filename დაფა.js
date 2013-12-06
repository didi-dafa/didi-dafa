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
                        '<select id="ენა" class="სავსე">'+
                        '<option value="0" selected>ქართული</option>'+
                        '</select>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        'სახელი'+
                        '<input  id="სახელი" class="სავსე"/>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        'მდებარეობა'+
                        '<input  id="მდებარეობა_ხ" class="მდებარეობა"/>'+
                        '<input  id="მდებარეობა_ჯ" class="მდებარეობა"/>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        'მომხმარებლები'+
                        '<select id="მომხმარებლები" multiple="multiple">'+
                        '</select>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        'ფერები'+
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
