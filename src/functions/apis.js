export async function getCommentsApi() {
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

export const createCommentApi = async (parentId = null, text) => {
	return {
		id: Math.floor(Math.random() * (100 - 0 + 1) + 0).toString(),
		comment: text,
		parentId,
		upvotes: 0,
		src: "/assets/2.jpg",
		fullname: "Anuj kumar",
		created_time: new Date().toISOString().split("T")[0].toString(),
	};
};

export const deleteCommentApi = async () => {
	return {};
};
