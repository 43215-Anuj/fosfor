import "./commentbox.scss";
import React, {useState} from "react";
import {Button} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import TextField from "@mui/material/TextField";

const ComponentBox = (props) => {
	const {currentuser, comment, updateComment, action} = props;
	const [updatedComment, setUpdatedComment] = useState(
		action === "reply" ? "" : comment.comment
	);

	function handleComment(e) {
		setUpdatedComment(e.target.value);
	}

	return (
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
					bgcolor: "#" + Math.floor(Math.random() * 16777215).toString(16),
				}}
				alt="asjds"
				src={currentuser}
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
				<Box className="comment_body" sx={{width: "100%"}}>
					<Box
						className="comment_head"
						sx={{
							display: "flex",
							alignItems: "flex-end",
							position: "relative",
							marginBottom: "1rem",
						}}
					>
						{action === "edit" && (
							<TextField
								fullWidth
								multiline
								rows={4}
								value={updatedComment}
								onChange={handleComment}
								variant="filled"
								id="comment_text_box"
								label={"Edit Comment"}
							/>
						)}
						{action === "reply" && (
							<TextField
								fullWidth
								multiline
								rows={4}
								value={updatedComment}
								onChange={handleComment}
								variant="filled"
								id="comment_text_box"
								label={"Add Comment"}
							/>
						)}
					</Box>
					<Button
						onClick={() => updateComment(comment.id, updatedComment)}
						sx={{float: "right"}}
						variant="contained"
					>
						Send
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default ComponentBox;
