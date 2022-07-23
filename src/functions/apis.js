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


export const createComment = async (text, parentId = null) => {
	return {
	  id: Math.random().toString(10).substr(2,9),
	  body: text,
	  parentId,
	  userId: "1",
	  username: "John",
	  createdAt: new Date().toISOString(),
	};
  };