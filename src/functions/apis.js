export async function getComments() {
	return await fetch("./data/comments.json", {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((jsondata) => {
			return jsondata.data;
		});
}
