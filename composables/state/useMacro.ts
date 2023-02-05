export default function () {
	return useState("macro", () => ({
		macro: "",
		repeat: false,
	}));
}
