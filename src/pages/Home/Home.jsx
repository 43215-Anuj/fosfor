import React, {useEffect, useState, useMemo} from "react";
import "./Home.scss";
import {getCommentsApi, deleteCommentApi} from "../../functions/apis";
import Container from "@mui/material/Container";
import Comment from "../../components/comment/Comment";
import {createCommentApi} from "../../functions/apis";

const Home = () => {
	const [allComments, setAllComments] = useState();
	const [activeComment, setActiveComment] = useState(null);
	const [action, setAction] = useState();

	const rootLevel = useMemo(() => {
		return getRootLevelComments(allComments);
	}, [allComments]);

	function getRootLevelComments(allComments) {
		const root =
			allComments &&
			allComments.filter((comment) => comment.parentId === null);

		root &&
			root.sort(function (a, b) {
				return parseInt(b.upvotes - a.upvotes);
			});

		return root;
	}

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

	const addComment = (commentId, text) => {
		createCommentApi(commentId, text).then((comment) => {
			setAllComments([comment, ...allComments]);
			setActiveComment(null);
			setAction(null);
		});
	};

	const deleteComment = (commentId) => {
		if (window.confirm("Are you sure you want to remove comment?")) {
			deleteCommentApi().then(() => {
				const updatedComments = allComments.filter(
					(comment) => comment.id !== commentId
				);
				setAllComments(updatedComments);
			});
		}
		setAction(null);
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
		setAction(null);
	};

	const updateComment = (commentId, text) => {
		let arr = allComments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					comment: text,
				};
			} else {
				return comment;
			}
		});
		setAllComments(arr);
		setActiveComment(null);
		setAction(null);
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
								action={action}
								key={rootcomment.id}
								setAction={setAction}
								comment={rootcomment}
								handleVotes={handleVotes}
								addComment={addComment}
								updateComment={updateComment}
								activeComment={activeComment}
								deleteComment={deleteComment}
								setActiveComment={setActiveComment}
								getReplies={getReplies}
							/>
					  ))
					: "Loading..."}
			</Container>
		</div>
	);
};

export default Home;
