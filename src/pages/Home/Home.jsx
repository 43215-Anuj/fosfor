import React, {useEffect, useState} from "react";
import "./Home.scss";
import {getComments} from "../../functions/apis";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Comment from "../../components/comment/Comment";

const Home = () => {
	const [allComments, setAllComments] = useState();
	const [firstLevel, setFirstLevel] = useState();

	useEffect(() => {
		async function fetchData() {
			let data = [];
			data = await getComments();

			Promise.all([data]).then((res) => {
				setAllComments(res);

				let first_lev = res.filter((comment) => {
					console.log(comment.comment_id);
				});
				console.log(first_lev);
			});
		}
		fetchData();
	}, []);

	return (
		<div className="wrapper">
			<Container maxWidth="sm">
				<Box
					sx={{
						bgcolor: "#EDEFF2",
						padding: "2rem 0",
						minHeight: "100vh",
						height: "100%",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Comment />
				</Box>
			</Container>
		</div>
	);
};

export default Home;
