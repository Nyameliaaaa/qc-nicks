export default function (value: boolean, modal = "") {
	const state = useModal();
	state.value = {
		open: value,
		modal: modal,
	};
}
