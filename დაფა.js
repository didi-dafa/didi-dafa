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
                        '<input  id="სახელი"/>'+
                    '</div>'+
                    '<div id="ფერები">'+
                    '</div>'+
                    '<div id="მომხმარებლები">'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<span data-თარგმანი="მდებარეობა">'+
                        'მდებარეობა'+
                        '</span>'+
                        '<input  id="მდებარეობა_ხ" class="სავსე"/>'+
                        '<input  id="მდებარეობა_ჯ" class="სავსე"/>'+
                    '</div>'+
                    '<hr/>'+
                    '<div>'+
                        '<input id="რუკა" type="submit" data-თარგმანი="რუკა" value="რუკა" class="სავსე"/>'+
                        '<input id="სხვა დანარჩენი" type="submit" data-თარგმანი="სხვა დანარჩენი" value="სხვა დანარჩენი" class="სავსე"/>'+
                    '</div>'+
                '</div>'+
                '</div>'+
                '<script type="text/javascript" src="/საცხობი.js"></script>'+
                '<script type="text/javascript" src="/ფერების-ასარჩევი.js"></script>'+
                '<script type="text/javascript" src="/გულ-ღვიძლი.js"></script>'+
                '<script type="text/javascript" src="/სახარახურე.js"></script>'+
            '</body>'+
        '</html>'

exports.ჩაუშვი=function(მოთხ, პასუხ){
    პასუხ.end(ზტაე)
}
