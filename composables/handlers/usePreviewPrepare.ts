export default function (nickname: string) {
	const colorMap = useColorMap();
	const previewOut = [];

	const parse = nickname.split('');
	let index = 0;

	while (index < parse.length) {
		const value = parse[index];

		if (value === '&') {
			const nextCharIndex = index + 1;
			const nextChar = parse[nextCharIndex];

			if (nextChar === '#') {
				previewOut.push({
					color: `${nickname.slice(nextCharIndex, index + 8)}`,
					text: ''
				});

				index += 8;
			} else {
				previewOut.push({
					color: `${colorMap[nextChar]}`,
					text: ''
				});

				index += 2;
			}
		} else {
			if (previewOut.length === 0) {
				previewOut.push({
					color: '',
					text: ''
				});
			}

			previewOut[previewOut.length - 1].text += value;
			index++;
		}
	}

	return previewOut;
}
