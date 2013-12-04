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
                        'დიდი დაფა'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        'სახელი'+
                        '<input  id="სახელი" />'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        'ენა'+
                        '<select id="ენა">'+
                        '<option value="0" selected>ქართული</option>'+
                        '</select>'+
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
