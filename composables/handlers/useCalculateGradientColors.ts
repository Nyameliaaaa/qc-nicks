export default function (
	workingText: string,
	startColor: string,
	endColor: string
) {
	workingText = workingText.replace(/&([0-9a-f]|#[0-9a-f]{6})/gi, "");

	const [startR, startG, startB] = useRGB(startColor);
	const [endR, endG, endB] = useRGB(endColor);

	const diffR = startR - endR;
	const diffG = startG - endG;
	const diffB = startB - endB;

	let stepR, stepG, stepB;

	if (workingText.length > 1) {
		stepR = diffR / (workingText.length - 1);
		stepG = diffG / (workingText.length - 1);
		stepB = diffB / (workingText.length - 1);
	} else {
		stepR = 0;
		stepG = 0;
		stepB = 0;
	}

	let output = "";

	for (let i = 0; i < workingText.length; i++) {
		let hexCode = "&#";

		hexCode += ("0" + (startR - Math.round(stepR * i)).toString(16)).slice(
			-2
		);

		hexCode += ("0" + (startG - Math.round(stepG * i)).toString(16)).slice(
			-2
		);

		hexCode += ("0" + (startB - Math.round(stepB * i)).toString(16)).slice(
			-2
		);

		hexCode += workingText[i];
		output += hexCode;
	}

	return output;
}
