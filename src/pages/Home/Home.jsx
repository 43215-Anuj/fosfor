import React, {useEffect, useState} from "react";
import "./Home.scss";
import {getComments} from "../../functions/apis";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Comment from "../../components/comment/Comment";

const Home = () => {
	const [allComments, setAllComments] = useState();
	// const [firstLevel, setFirstLevel] = useState();

	useEffect(() => {
		async function fetchData() {
			let data = [];
			data = await getComments();

			Promise.all([data]).then((res) => {
				res[0].sort(function (a, b) {
					console.log(parseInt(b.upvotes - b.downvotes));
					return parseInt(
						b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
					);
				});
				setAllComments(res[0]);
			});
		}
		fetchData();
	}, []);

	return (
		<div className="wrapper">
			<Container
				maxWidth="sm"
				sx={{
					bgcolor: "#EDEFF2",
					minHeight: "100vh",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				{allComments
					? allComments.map((comment) => (
							<Comment key={comment.id} data={comment} />
					  ))
					: "Loading..."}
			</Container>
		</div>
	);
};

export default Home;
