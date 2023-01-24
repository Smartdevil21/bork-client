import React, { useEffect, useState } from "react";
import Styles from "./Login.module.scss";
import login from "../../Images/login.png";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { StateContext } from "../../App";

function Login() {
	const { states, setStates } = useContext(StateContext);
	const navigator = useNavigate();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const loginUser = async (e) => {
		if (e.key === "Enter" || e.type === "click") {
			setLoading(true);
			try {
				const response = await axios({
					url: "/userSignIn",
					method: "post",
					data: user,
				});
				if (response.data.state) {
					document.querySelector(".login_err").innerHTML = "";
					setStates((prev) => ({
						...prev,
						user_email: response.data.result.email,
						username: response.data.result.username,
						userLoggedIn: true,
					}));
					alert("Welcome");
					navigator(`/home?user_id=${response.data.result._id}`);
				} else {
					document.querySelector(".login_err").innerHTML =
						"Incorrect Username or Password!";
				}
			} catch (error) {
				console.error(error);
			}
			setLoading(false);
		}
	};

	return (
		<div className={Styles.login} onKeyDown={loginUser} tabIndex="0">
			<div className={Styles.login_wrapper}>
				<div className={Styles.login_img}>
					<img src={login} alt="login_img" />
				</div>
				<div className={Styles.login_inputs}>
					<Stack direction={"column"} spacing={2}>
						<h1>Sign In...</h1>
						<TextField
							variant="standard"
							size="small"
							label="Username"
							value={user.username}
							onChange={(e) => {
								setUser((prev) => ({ ...prev, username: e.target.value }));
							}}
							type="text"
						/>
						<TextField
							variant="standard"
							size="small"
							value={user.password}
							onChange={(e) => {
								setUser((prev) => ({ ...prev, password: e.target.value }));
							}}
							label="Password"
							type="password"
						/>
						<p
							className="login_err"
							style={{ color: "red", fontSize: "10px", fontWeight: "600" }}
						></p>
						<div className={Styles.bottom_btns}>
							<Button onClick={loginUser}>
								{loading ? "loading" : "Sign-In"}
							</Button>
						</div>
						<Stack>
							<p className={Styles.sign_up_link}>
								Don't have an account?{" "}
								<NavLink exact="true" to="/signup">
									Create one
								</NavLink>
							</p>
						</Stack>
					</Stack>
				</div>
			</div>
		</div>
	);
}

export default Login;
