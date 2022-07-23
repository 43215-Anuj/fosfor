import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
const Error404 = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<ReportGmailerrorredIcon fontSize="large" />
				<h6>Error 404! Page Not Found</h6>
			</div>
		</div>
	);
};

export default Error404;
