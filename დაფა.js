exports.ჩაუშვი=function(პასუხ){
    პასუხ.setHeader("Content-Type", "text/html; charset=utf-8")
    პასუხ.end(
        '<!DOCTYPE html>'+
        '<html>'+
            '<head>'+
                '<link rel="stylesheet" href="/სახე.css">'+
            '</head>'+
            '<body>'+
                '<div id="მთავარი_ნაჭერი">'+
                '<canvas id="დაფა"">'+
                '</canvas>'+
                '</div>'+
                '<script type="text/javascript" src="/გულ-ღვიძლი.js"></script>'+
            '</body>'+
        '</html>')
} 
