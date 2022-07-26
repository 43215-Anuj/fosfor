import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ReplyIcon from "@mui/icons-material/Reply";
import "./comment.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ComponentBox from "../CommentBox/CommentBox";
import {useEffect} from "react";

export default function Comment(props) {
	const {
		action,
		setAction,
		comment,
		getReplies,
		handleVotes,
		addComment,
		deleteComment,
		updateComment,
		activeComment,
		setActiveComment,
	} = props;

	const [replies, setReplies] = useState();

	useEffect(() => {
		setReplies(getReplies(comment.id));
	}, [activeComment, comment, getReplies]);

	function timeDifference(current, previous) {
		var msPerMinute = 60 * 1000;
		var msPerHour = msPerMinute * 60;
		var msPerDay = msPerHour * 24;
		var msPerMonth = msPerDay * 30;
		var msPerYear = msPerDay * 365;

		var elapsed = current.getTime() - previous.getTime();

		if (elapsed < msPerMinute) {
			return Math.round(elapsed / 1000) + " sec ago";
		} else if (elapsed < msPerHour) {
			return Math.round(elapsed / msPerMinute) + " min ago";
		} else if (elapsed < msPerDay) {
			return Math.round(elapsed / msPerHour) + " h ago";
		} else if (elapsed < msPerMonth) {
			return Math.round(elapsed / msPerDay) + " d ago";
		} else if (elapsed < msPerYear) {
			return Math.round(elapsed / msPerMonth) + " mon ago";
		} else {
			return Math.round(elapsed / msPerYear) + " yrs ago";
		}
	}

	function handleActiveComponent() {
		setActiveComment(comment.id);
	}

	return (
		<>
			<Box
				onClick={handleActiveComponent}
				className={`${
					activeComment === comment.id ? "active" : ""
				} comment_wrapper`}
				sx={{
					bgcolor: "transparent",
					height: "fit-content",
					display: "flex",
					width: "100%",
					margin: "1.5rem 0",
					justifyContent: "space-between",
				}}
			>
				<Avatar
					sx={{
						marginRight: "1.5rem",
						boxShadow: "0 0 9px 1px #dfdfdf",
						bgcolor:
							"#" + Math.floor(Math.random() * 16777215).toString(16),
					}}
					alt={comment.fullname}
					src={comment.src}
				/>
				<Box
					className="comment_container"
					sx={{
						position: "relative",
						bgcolor: "#fff",
						padding: "1.5rem",
						width: "100%",
						height: "fit-content",
						borderRadius: "0.8rem",
						display: "flex",
						border: "1px solid rgba(0,0,0,0.2)",
						flexDirection: "row",
						boxShadow: "0 0 9px 1px #dfdfdf",
					}}
				>
					<ArrowLeftIcon
						sx={{
							fontSize: "4rem",
							color:
								activeComment === comment.id
									? "rgb(222, 244, 255)"
									: "#fff",
							position: "absolute",
							top: "0",
							left: "-2.2rem",
						}}
					/>
					<Box
						className="votes"
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							alignItems: "center",
							borderRadius: "50px",
							bgcolor: "#EDEFF2",
							padding: "1px",
							marginRight: "1.5rem",
						}}
					>
						<IconButton
							onClick={() => handleVotes(true, comment.id)}
							aria-label="upvote"
							sx={{
								bgcolor: "#fff",
								"&:hover": {
									backgroundColor: "#0077b5",
									color: "#fff",
								},
							}}
						>
							<AddIcon />
						</IconButton>
						<p className="vote_score">{parseInt(comment.upvotes)}</p>
						<IconButton
							onClick={() => handleVotes(false, comment.id)}
							aria-label="downvote"
							sx={{
								bgcolor: "#fff",
								"&:hover": {
									backgroundColor: "#0077b5",
									color: "#fff",
								},
							}}
						>
							<RemoveIcon />
						</IconButton>
					</Box>
					<Box className="comment_body">
						<Box
							className="comment_head"
							sx={{
								display: "flex",
								alignItems: "flex-start",
								justifyContent: "space-between",
								position: "relative",
								marginBottom: "1rem",
							}}
						>
							<p className="username">{comment.fullname}</p>
							{comment.fullname === "Anuj kumar" && (
								<Box
									element="span"
									sx={{
										bgcolor: "#0077b5",
										padding: "0.5rem 1rem",
										color: "#fff",
										borderRadius: "0.5rem",
									}}
								>
									You
								</Box>
							)}
							<p className="created_time">
								{timeDifference(
									new Date(),
									new Date(comment.created_time)
								)}
							</p>

							{activeComment === comment.id ? (
								<Box className="action_buttons">
									<Button
										onClick={() => setAction("edit")}
										startIcon={<ModeEditOutlineOutlinedIcon />}
									>
										Edit
									</Button>
									<Button
										onClick={() => deleteComment(comment.id)}
										sx={{color: "red"}}
										startIcon={<DeleteOutlineIcon />}
									>
										Delete
									</Button>
								</Box>
							) : (
								<Box className="action_buttons">
									<Button
										onClick={() => {
											setAction("reply");
										}}
										startIcon={<ReplyIcon />}
									>
										Reply
									</Button>
								</Box>
							)}
						</Box>
						<p className="comment_text">{comment.comment}</p>
					</Box>
				</Box>
			</Box>
			<Box className="replies">
				{replies &&
					replies.length !== 0 &&
					replies.map((reply) => {
						return (
							<React.Fragment key={reply.id}>
								<Comment
									comment={reply}
									action={action}
									setAction={setAction}
									handleVotes={handleVotes}
									updateComment={
										action === "reply" ? addComment : updateComment
									}
									activeComment={activeComment}
									deleteComment={deleteComment}
									setActiveComment={setActiveComment}
									getReplies={getReplies}
								/>
								{reply.parentId !== null &&
									action === "reply" &&
									activeComment === reply.id && (
										<ComponentBox
											comment={reply}
											currentuser={"/assets/2.jpg"}
											action={action}
											activeComment={activeComment}
											setActiveComment={setActiveComment}
											updateComment={addComment}
										/>
									)}
								{reply.parentId !== null &&
									action === "edit" &&
									activeComment === reply.id && (
										<ComponentBox
											comment={reply}
											currentuser={reply.src}
											activeComment={activeComment}
											setActiveComment={setActiveComment}
											action={action}
											updateComment={updateComment}
										/>
									)}
							</React.Fragment>
						);
					})}
			</Box>
			{comment.parentId === null &&
				action === "reply" &&
				activeComment === comment.id && (
					<ComponentBox
						comment={comment}
						currentuser={"/assets/2.jpg"}
						action={action}
						activeComment={activeComment}
						setActiveComment={setActiveComment}
						updateComment={addComment}
					/>
				)}
			{comment.parentId === null &&
				action === "edit" &&
				activeComment === comment.id && (
					<ComponentBox
						comment={comment}
						currentuser={comment.src}
						activeComment={activeComment}
						setActiveComment={setActiveComment}
						action={action}
						updateComment={updateComment}
					/>
				)}
		</>
	);
}
