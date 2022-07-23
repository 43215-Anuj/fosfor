import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ReplyIcon from "@mui/icons-material/Reply";
import "./comment.scss";
import {deepOrange} from "@mui/material/colors";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


const Comment = () => {
	return (
		<Box
			sx={{
				bgcolor: "transparent",
				height: "fit-content",
				display: "flex",
				width: "100%",
				padding: "1.5rem",
				justifyContent: "space-between",
			}}
		>
			<Avatar
				sx={{
					marginRight: "1.5rem",
					boxShadow: "0 0 9px 1px #dfdfdf",
					bgcolor: deepOrange[500],
				}}
				alt="Remy Sharp"
				src="/static/images/avatar/2.jpg"
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
					<p className="vote_score">20</p>
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
						<p className="username">Anuj Kumar</p>
						<p className="created_time">2 month ago</p>
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
					<p className="comment_text">
						Duis aliquam convallis nunc. Proin at turpis a pede posuere
						nonummy. Integer non velit. Donec diam neque, vestibulum eget,
						vulputate ut, ultrices vel, augue. Vestibulum ante ipsum
						primis in faucibus
					</p>
				</Box>
			</Box>
		</Box>
	);
};

export default Comment;
