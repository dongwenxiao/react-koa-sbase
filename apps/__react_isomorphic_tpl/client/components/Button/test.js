console.log('1111111   LazilyLoadFactory')

if (__CLIENT__) {
    require('style-loader/url!file-loader!./Button.css')
}