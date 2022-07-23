import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ReplyIcon from "@mui/icons-material/Reply";
import "./comment.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Comment(props) {
	const {data} = props;
	const [time, setTime] = useState();

	function timeDifference(current, previous) {
		var msPerMinute = 60 * 1000;
		var msPerHour = msPerMinute * 60;
		var msPerDay = msPerHour * 24;
		var msPerMonth = msPerDay * 30;
		var msPerYear = msPerDay * 365;

		console.log(current.getTime(), previous.getTime());
		var elapsed = current.getTime() - previous.getTime();

		if (elapsed < msPerMinute) {
			return Math.round(elapsed / 1000) + " seconds ago";
		} else if (elapsed < msPerHour) {
			return Math.round(elapsed / msPerMinute) + " minutes ago";
		} else if (elapsed < msPerDay) {
			return Math.round(elapsed / msPerHour) + " hours ago";
		} else if (elapsed < msPerMonth) {
			return Math.round(elapsed / msPerDay) + " days ago";
		} else if (elapsed < msPerYear) {
			return Math.round(elapsed / msPerMonth) + " months ago";
		} else {
			return Math.round(elapsed / msPerYear) + " years ago";
		}
	}

	return (
		<>
			<Box
				className="comment_wrapper"
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
					alt={data.fullname}
					src={data.src}
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
							color: "#fff",
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
						<p className="vote_score">
							{parseInt(data.upvotes) - parseInt(data.downvotes)}
						</p>
						<IconButton
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
								alignItems: "flex-end",
								position: "relative",
								marginBottom: "1rem",
							}}
						>
							<p className="username">{data.fullname}</p>
							<p className="created_time">
								{timeDifference(
									new Date(),
									new Date(data.created_time)
								)}
							</p>
							<Box
								element="span"
								sx={{
									display: "flex",
									alignItems: "center",
									color: "#0077b5",
									position: "absolute",
									right: "0",
									top: 0,
								}}
							>
								<ReplyIcon />
								<Box element="span" sx={{marginLeft: "0.5rem"}}>
									Reply
								</Box>
							</Box>
						</Box>
						<p className="comment_text">{data.comment}</p>
					</Box>
				</Box>
			</Box>
			<Box className="replies">
				{data.replies &&
					data.replies.map((reply) => {
						return <Comment key={reply.id} data={reply} />;
					})}
			</Box>
		</>
	);
}
