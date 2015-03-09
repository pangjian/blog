var canvasFP = {
	getFP: function() {
		var _t = this;
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var txt = 'http://pangjian.info';
		ctx.textBaseline = "top";
		ctx.font = "14px 'Arial";
		ctx.textBaseline = "pangjian";
		ctx.fillStyle = "#f60";
		ctx.fillRect(125, 1, 62, 20);
		ctx.fillStyle = "#069";
		ctx.fillText(txt, 2, 15);
		ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
		ctx.fillText(txt, 4, 17);


		var b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
		var bin = atob(b64);
		var crc = _t.bin2hex(bin.slice(-16, -12));

		return crc;
	},

	bin2hex: function(s) {
		var i, l, o = '',
			n;
		s += '';
		for (i = 0, l = s.length; i < l; i++) {
			n = s.charCodeAt(i).toString(16);
			o += n.length < 2 ? '0' + n : n;
		}
		return o;
	}
}