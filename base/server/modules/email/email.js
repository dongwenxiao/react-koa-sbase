//
// copy UX翻译平台的code ，待整理
// 
// 
// 
//





var nodemailer = require('nodemailer');
var emailConfig = require('../config/email-config');
var appConfig = require('../config/app-config');
 
function sendMail(options, cb){

    // var mail = "cmcm_support@conew.com";
    // var password = "scqumfepcebtdejh";
    var mail = emailConfig.email;
    var password = emailConfig.password;

    // create reusable transporter object using the default SMTP transport 
    // var transporter = nodemailer.createTransport('smtps://cmcm_support%40conew.com:scqumfepcebtdejh@smtp.gmail.com');
    var transporter = nodemailer.createTransport('smtps://'+mail.replace('@','%40')+':'+password+'@smtp.gmail.com');
     
    // setup e-mail data with unicode symbols 
    var mailOptions = {
        from: '"CM Localization" <cmcm_support@conew.com>', // sender address 
        to: 'dongwenxiao@cmcm.com, cs_victor@126.com', // list of receivers 
        subject: 'Hello ✔', // Subject line 
        text: '', // plaintext body 
        html: '<b>Hello world 🐴</b>' // html body 
    };

    if(options){
        options.from && (mailOptions.from = options.from);
        options.to && (mailOptions.to = options.to);
        options.subject && (mailOptions.subject = options.subject);
        options.subject && (mailOptions.subject = options.subject);
        options.text && (mailOptions.text = options.text);
        options.html && (mailOptions.html = options.html);
    }
     
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            cb(false);
            console.log(error);
        }else{
            cb(true);
            console.log('Message sent: ' + info.response);
        }        
    });

 }

 /////////////////////////////////////////////////////////////////////////////////
 ///
 /// 下面是邮件模版
 ///
 /////////////////////////////////////////////////////////////////////////////////


/**
 * 给用户发创建项目成功的邮件
 * @param  {[string]} emails 邮件列表，以逗号链接的字符串
 * @return {[bool]} 是否发生成功
 */
function sendUserCreateSuccessMail(emails, data){
    return sendMail({
        to: emails,
        subject: '【CMLP】您的翻译需求（' + data.name + '）已成功提交',
        html: '<p>亲爱的小豹，</p>'
            + '<p>'
            + '您的翻译需求（需求名称：' + data.name + '）已成功提交，需求详情如下：' + '<br>'
            + '需求提交时间：'+ data.createDate + '<br>'
            + '期望完成时间：'+ data.expectFinishDate + '<br>'
            + '源语言：'+ data.sourceLang + '<br>'
            + '目标语言: '+ data.targetLang + '<br>'
            + '项目信息：'+ data.projectInfo + '<br>'
            + '我们将最快的速度处理，请留意邮件状态提醒。' + '<br>'
            + '感谢支持！'  + '<br>'
            + '如有问题请联系：' + '<br>'
            + '电子邮件: songqingfu@cmcm.com' + '<br>'
            + 'QQ: 549750316' + '<br>'
            + '</p>'
    },function(success){
        if(success){
            console.log('send email ['+ emails +'] '+ success);
        }
    });
}

/**
 * 任务开始提醒（任务状态改为英文翻译的的状态，给创建人发邮件）
 * @param  {[type]} emails [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
function sendUserChangeProjectStatus2Mail(emails, data){

    var link = appConfig.baseUrl + '/project/detail/' + data.id;
    return sendMail({
        to: emails,
        subject: '【CMLP】翻译需求（' + data.name + '）已经开始处理',
        html: '<p>亲爱的小豹，</p>'
            + '<p>'
            + '您的翻译需求（需求名称：' + data.name + '）已经开始处理' + '<br>'
            + '需求提交时间：'+ data.createDateFormat + '<br>'
            + '期望完成时间：'+ data.expectFinishDateFormat + '<br>'
            + '源语言：'+ data.sourceLang + '<br>'
            + '目标语言: '+ data.targetLang + '<br>'
            + '项目信息：'+ data.projectInfo + '<br>'
            + '任务链接：<a href="'+ link +'">'+ link +'</a>' + '<br>'
            + '感谢支持！' + '<br>'
            + '</p>'
    },function(success){
        console.log('send email ['+ emails +'] '+ success);
    });
}
function sendUserChangeProjectStatus3Mail(){
}
function sendUserChangeProjectStatusFinishMail(emails, data){
    var link = appConfig.baseUrl + '/project/detail/' + data.id;
    var fileObj = JSON.parse(data.file);    
    var resultLink = appConfig.baseUrl + fileObj.resultFile.path.replace('public', '');
    var rateLink = appConfig.baseUrl+ '/project/rate/' + data.id;
    var content = [
        '<p>',
        '新的翻译需求（'+ data.name +'）已成功完成',
        '需求提交时间：'+ data.createDateFormat,
        '期望完成时间：'+ data.expectFinishDateFormat,
        '源语言：'+ data.sourceLang,
        '目标语言: '+ data.targetLang,
        '项目信息：'+ data.projectInfo,
        '任务链接：<a href="'+link+'">'+link+'</a>',
        '翻译文件下载链接：<a href="'+resultLink+'">'+resultLink+'</a>',
        '翻译文件备注：'+ data.translateRemark,
        '亲，给个好评吧：<a href="' +rateLink + '">'+rateLink+'</a>',
        '</p>'
    ];
    
    return sendMail({
        to: emails,
        subject: '【CMLP】翻译需求（'+ data.name +'）已成功完成',
        html: content.join('<br>')
    }, function(success){
        console.log('send email ['+ emails +'] '+ success);
    });

}
function sendUserProjectFinishTimeout(emails, data){
    sendAdminProjectFinishTimeout(emails, data);
}

/**
 * 期望完成时间更改提醒（期望完成时间被创建人或者处理人更改之后，发邮件给创建人和处理人）
 * @param  {[type]} emails [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
function sendUserChangeProjectFinishTime(emails, data){
    var link = appConfig.baseUrl + '/project/detail/' + data.id;
    var content = [
        '<p>',
        '亲爱的小豹',
        '敬请留意翻译需求（'+ data.name +'）的预计完成时间已经更新',
        '原期望完成时间：'+ data.oldExpectFinishDate,
        '新期望完成时间：'+ data.expectFinishDate,
        '源语言：'+ data.sourceLang,
        '目标语言: '+ data.targetLang,
        '项目信息：'+ data.projectInfo,
        '任务链接：<a href="'+link+'">'+link+'</a>'
    ];

    return sendMail({
        to: emails,
        subject: '【CMLP】翻译需求（'+ data.name +'）预计完成时间已更新',
        html: content.join('<br>')
    }, function(success){
        if(success){
            console.log('send email ['+ emails +'] '+ success);
        }
    });
}


/////////////////////////////////////////////////////////////////////////////////
/**
 * 任务创建成功之后超过12小时状态未改变，提醒管理员
 * @param  {[type]} emails [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
function sendAdminProjectHandleTimeout(emails, data){

    var link = appConfig.baseUrl + '/project/detail/' + data.id;
    var content = [
        '<p>',
        '翻译需求（'+ data.name +'）超时未处理，需要立即处理',
        '需求提交时间：'+ data.createDate,
        '期望完成时间：'+ data.expectFinishDate,
        '源语言：'+ data.sourceLang,
        '目标语言: '+ data.targetLang,
        '项目信息：'+ data.projectInfo,
        '创建人：'+ data.creator,
        '任务链接：<a href="'+link+'">'+link+'</a>',
        '</p>'
    ];

    return sendMail({
        to: emails,
        subject: '【CMLP】新的翻译需求（'+ data.name +'）需要立即处理',
        html: content.join('<br>')
    }, function(success){
        if(success){
            console.log('send email ['+ emails +'] '+ success);
        }
    });
}

/**
 * 任务超时未提交（任务超过指定提交时间状态未改为完成，提醒管理员和创建人）
 * @return {[type]} [description]
 */
function sendAdminProjectFinishTimeout(emails, data){
    var link = appConfig.baseUrl + '/project/detail/' + data.id;
    var content = [
        '<p>',
        '翻译需求（'+ data.name +'）超时未提交，需要立即处理',
        '需求提交时间：'+ data.createDateFormat,
        '期望完成时间：'+ data.expectFinishDateFormat,
        '源语言：'+ data.sourceLang,
        '目标语言: '+ data.targetLang,
        '项目信息：'+ data.projectInfo,
        '任务链接：<a href="'+link+'">'+link+'</a>',
        '</p>'
    ];

    return sendMail({
        to: emails,
        subject: '【CMLP】翻译需求（'+ data.name +'）超时未提交',
        html: content.join('<br>')
    }, function(success){
        if(success){
            console.log('send email ['+ emails +'] '+ success);
        }
    });
}

/**
 * 新任务提醒（任务创建成功之后发邮件给管理员）
 * @param  {[type]} emails [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
function sendAdminNewProjectMail(emails, data){
    var link = appConfig.baseUrl + '/project/detail/' + data.id;

    var content = [
        '<p>',
        '新的翻译需求（'+ data.name +'）需要处理 - （'+data.level+'）',
        '需求提交时间：'+ data.createDate,
        '期望完成时间：'+ data.expectFinishDate,
        '源语言：'+ data.sourceLang,
        '目标语言: '+ data.targetLang,
        '项目信息：'+ data.projectInfo,
        '创建人：'+ data.creator,
        '任务链接：<a href="'+link+'">'+link+'</a>',
        '</p>'
    ];

    return sendMail({
        to: emails,
        subject: '【CMLP】新的翻译需求（'+ data.name +'）需要处理 - （'+data.level+'）',
        html: content.join('<br>')
    }, function(success){
        if(success){
            console.log('send email ['+ emails +'] '+ success);
        }
    });
}


/**
 * 期望完成时间更改提醒（期望完成时间被创建人或者处理人更改之后，发邮件给创建人和处理人）
 * @param  {[type]} emails [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
function sendAdminChangeProjectFinishTime(emails, data){
    var link = appConfig.baseUrl + '/project/detail/' + data.id;
    var content = [
        '<p>',
        '亲爱的小豹',
        '敬请留意翻译需求（'+ data.name +'）的预计完成时间已经更新',
        '原期望完成时间：'+ data.oldExpectFinishDate,
        '新期望完成时间：'+ data.expectFinishDate,
        '源语言：'+ data.sourceLang,
        '目标语言: '+ data.targetLang,
        '项目信息：'+ data.projectInfo,
        '任务链接：<a href="'+link+'">'+link+'</a>'
    ];

    return sendMail({
        to: emails,
        subject: '【CMLP】翻译需求（'+ data.name +'）预计完成时间已更新',
        html: content.join('<br>')
    }, function(success){
        if(success){
            console.log('send email ['+ emails +'] '+ success);
        }
    });
}


module.exports = {
    sendMail: sendMail,
    sendUserCreateSuccessMail: sendUserCreateSuccessMail,
    sendUserChangeProjectStatus2Mail: sendUserChangeProjectStatus2Mail,
    sendUserChangeProjectStatus3Mail: sendUserChangeProjectStatus3Mail,
    sendUserChangeProjectStatusFinishMail: sendUserChangeProjectStatusFinishMail,
    sendUserProjectFinishTimeout: sendUserProjectFinishTimeout,
    sendUserChangeProjectFinishTime: sendUserChangeProjectFinishTime,
    sendAdminProjectHandleTimeout: sendAdminProjectHandleTimeout,
    sendAdminProjectFinishTimeout: sendAdminProjectFinishTimeout,
    sendAdminChangeProjectFinishTime: sendAdminChangeProjectFinishTime,
    sendAdminNewProjectMail: sendAdminNewProjectMail
}