/*var fs = require("fs");
var zip = require("node-native-zip");

var archive = new zip();

archive.addFiles([
    { name: "moehah.txt", path: "./test/moehah.txt" },
    { name: "images/suz.jpg", path: "./test/images.jpg" }
], function() {
    var buff = archive.toBuffer();

    fs.writeFile("./test2.zip", buff, function() {
        console.log("Finished");
    });
}, function(err) {
    console.log(err);
});
*/