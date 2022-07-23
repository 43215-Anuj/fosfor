import React, {useEffect, useState} from "react";
import "./Home.scss";
import {getComments} from "../../functions/apis";
import Container from "@mui/material/Container";
import Comment from "../../components/comment/Comment";
import AddComment from "../../components/addCommentBox/AddComment";

const Home = () => {
	const [allComments, setAllComments] = useState();
	const [rootLevel, setRootLevel] = useState();

	useEffect(() => {
		async function fetchData() {
			let data = [];
			data = await getComments();

			Promise.all([data]).then((res) => {
				setAllComments(res[0]);
				var root = res[0].filter((comment) => comment.parentId === null);

				root.sort(function (a, b) {
					return parseInt(b.upvotes - a.upvotes);
				});
				setRootLevel(root);
			});
		}
		fetchData();
	}, []);

	const getReplies = (commentId) =>
		allComments
			.filter((comment) => comment.parentId === commentId)
			.sort(
				(a, b) =>
					new Date(a.created_time).getTime() -
					new Date(b.created_time).getTime()
			);

	const handleDownVotes = (id) => {
		let arr = allComments.map((comment) => {
			if (comment.id === id) {
				console.log("in");
				return {
					...comment,
					upvotes: (parseInt(comment.upvotes) - 1).toString(),
				};
			} else {
				return comment;
			}
		});
		setAllComments(arr);
	};
	
	const handleUpVotes = (id) => {
		let arr = allComments.map((comment) => {
			if (comment.id === id) {
				return {
					...comment,
					upvotes: (parseInt(comment.upvotes) + 1).toString(),
				};
			} else {
				return comment;
			}
		});
		setAllComments(arr);
	};

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
				{rootLevel
					? rootLevel.map((rootcomment) => (
							<Comment
								key={rootcomment.id}
								comment={rootcomment}
								handleDownVotes={handleDownVotes}
								handleUpVotes={handleUpVotes}
								replies={getReplies(rootcomment.id)}
							/>
					  ))
					: "Loading..."}
				<AddComment />
			</Container>
		</div>
	);
};

export default Home;
