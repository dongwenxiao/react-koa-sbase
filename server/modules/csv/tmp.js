function exportCsv(res, filename, content){
	// 设置 header 使浏览器下载文件
	res.setHeader('Content-Description', 'File Transfer');
	res.setHeader('Content-Type', 'application/csv; charset=utf-8');
	res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
	res.setHeader('Expires', '0');
	res.setHeader('Cache-Control', 'must-revalidate');	

	// 为了让 Windows 能识别 utf-8，加上了 dom
	res.send('\uFEFF' + content);
}

module.exports = {
	export: exportCsv
}