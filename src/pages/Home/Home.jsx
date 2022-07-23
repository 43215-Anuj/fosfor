import React, {useEffect, useState} from "react";
import "./Home.scss";
import {getCommentsApi, deleteCommentApi} from "../../functions/apis";
import Container from "@mui/material/Container";
import Comment from "../../components/comment/Comment";

const Home = () => {
	const [allComments, setAllComments] = useState();
	const [activeComment, setActiveComment] = useState(null);
	
	
	const rootLevel =
		allComments && allComments.filter((comment) => comment.parentId === null);

	rootLevel &&
		rootLevel.sort(function (a, b) {
			return parseInt(b.upvotes - a.upvotes);
		});

	useEffect(() => {
		async function fetchData() {
			let data = [];
			data = await getCommentsApi();

			Promise.all([data]).then((res) => {
				setAllComments(res[0]);
			});
		}
		fetchData();
	}, []);

	const deleteComment = (commentId) => {
		if (window.confirm("Are you sure you want to remove comment?")) {
			deleteCommentApi().then(() => {
				const updatedComments = allComments.filter(
					(comment) => comment.id !== commentId
				);
				setAllComments(updatedComments);
			});
		}
	};

	const getReplies = (commentId) =>
		allComments
			.filter((comment) => comment.parentId === commentId)
			.sort(
				(a, b) =>
					new Date(a.created_time).getTime() -
					new Date(b.created_time).getTime()
			);

	const handleVotes = (action, id) => {
		let arr = allComments.map((comment) => {
			if (comment.id === id) {
				return {
					...comment,
					upvotes: action
						? (parseInt(comment.upvotes) + 1).toString()
						: (parseInt(comment.upvotes) - 1).toString(),
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
								handleVotes={handleVotes}
								activeComment={activeComment}
								deleteComment={deleteComment}
								setActiveComment={setActiveComment}
								replies={getReplies(rootcomment.id)}
							/>
					  ))
					: "Loading..."}
				
			</Container>
		</div>
	);
};

export default Home;
