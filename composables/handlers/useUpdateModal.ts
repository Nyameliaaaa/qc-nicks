export default function <T = {}>(value: boolean, modal = "", data = {}) {
	const state = useModal();
	state.value = {
		open: value,
		modal: modal,
		data: data
	};
}
