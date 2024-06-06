export default function () {
	const nick = useNick();
	const colors = useColors();

	if (nick.value.length < colors.value.length) {
		useUpdateModal(true, 'GradientSize', { colorLen: colors.value.length, nickLen: nick.value.length });
		return;
	} else {
		let out = "";
		nick.value = nick.value.replace(/&([0-9a-f]|#[0-9a-f]{6})/gi, "");
	
		const sections = nick.value.length / (colors.value.length - 1);
		const stages = colors.value.length - 1;
	
		for (let index = 0; index < stages; index++) {
			const textToSend = nick.value.slice(
				Math.floor(sections * index),
				Math.floor(sections * (index + 1))
			);
	
			out += useCalculateGradientColors(
				textToSend,
				colors.value[index],
				colors.value[index + 1]
			);
		}
	
		nick.value = out;
	}
}
