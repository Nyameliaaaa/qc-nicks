export default function () {
	const nick = useNick();
	const preview = usePreview();
	const colorMap = useColorMap();

	preview.value = [];

	const parse = nick.value.split("");
	let index = 0;

	while (index < parse.length) {
		const value = parse[index];

		if (value === "&") {
			if (parse[index + 1] === "#") {
				preview.value.push({
					color: `${nick.value.slice(index + 1, index + 8)}`,
					text: "",
				});

				index += 8;
			} else {
				preview.value.push({
					color: `${colorMap[parse[index + 1]]}`,
					text: "",
				});

				index += 2;
			}
		} else {
			if (preview.value.length === 0) {
				preview.value.push({
					color: "",
					text: "",
				});
			}

			preview.value[preview.value.length - 1].text += value;
			index++;
		}
	}
}
