import React, { useEffect, useState } from "react";
import Styles from "./Sidebar.module.scss";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../App";


function Sidebar() {
	const navigator = useNavigate();
	const { states, setStates } = useContext(StateContext);
	const [activeLinksStatus, setActiveLinksStatus] = useState("todo");
	useEffect(() => {
		const pathname = window.location.pathname;
		switch (pathname) {
			case "/home":
				setActiveLinksStatus("home");
				break;
			case "/todo":
				setActiveLinksStatus("todo");
				break;
			case "/habit_tracker":
				setActiveLinksStatus("habit-tracker");
				break;
			case "/calender":
				setActiveLinksStatus("calender");
				break;
			case "/feedback":
				setActiveLinksStatus("feedback");
				break;
			default:
				break;
		}
	});
	return (
		<div className={Styles.sidebar}>
			<div className={Styles.logo}>
				<svg
					width="45"
					height="40"
					viewBox="0 0 45 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M20 0L37.3205 10V30L20 40L2.67949 30V10L20 0Z"
						fill="#009394"
					/>
					<path
						d="M25 0L42.3205 10V30L25 40L7.67949 30V10L25 0Z"
						fill="url(#paint0_linear_29_2)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_29_2"
							x1="42.2"
							y1="20"
							x2="6.6"
							y2="20"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#00E0C7" />
							<stop offset="1" stopColor="#009394" />
						</linearGradient>
					</defs>
				</svg>
				<h3>Bork</h3>
			</div>
			<div className={Styles.sidebar_div}>
				<div className={Styles.main_links}>
					<NavLink
						to={`/home?user_id=${states.user_id}`}
						className={
							activeLinksStatus === "home" ? Styles.active : ""
						}
					>
						<div className={Styles.sidebar_link_item}>
							<Icon icon="codicon:home" />
							<p>Home</p>
						</div>
					</NavLink>

					<NavLink
						to={`/habit_tracker?user_id=${states.user_id}`}
						className={
							activeLinksStatus === "habit-tracker" ? Styles.active : ""
						}
					>
						<div className={Styles.sidebar_link_item}>
							<Icon icon="ant-design:field-time-outlined" />
							<p>Habit Tracker</p>
						</div>
					</NavLink>
					<NavLink
						to={`/todo?user_id=${states.user_id}`}
						className={activeLinksStatus === "todo" ? Styles.active : ""}
					>
						<div className={Styles.sidebar_link_item}>
							<Icon icon="icons8:todo-list" />
							<p>To-Do List</p>
						</div>
					</NavLink>
					<NavLink
						to={`/calender?user_id=${states.user_id}`}
						className={activeLinksStatus === "calender" ? Styles.active : ""}
					>
						<div className={Styles.sidebar_link_item}>
							<Icon icon="uil:calender" />
							<p>Calender</p>
						</div>
					</NavLink>

					<NavLink
						to={`/feedback?user_id=${states.user_id}`}
						className={activeLinksStatus === "feedback" ? Styles.active : ""}
					>
						<div className={Styles.sidebar_link_item}>
							<Icon icon="fluent:person-feedback-24-regular" />
							<p>Feedback</p>
						</div>
					</NavLink>
				</div>
					<div className={Styles.logout_btn} onClick={()=>{
							setStates((perv)=>({...perv, userLoggedIn:false}));
							navigator("/");
						}}>
						<Icon icon="carbon:logout" />
						<p>Logout</p>
					</div>
			</div>
		</div>
	);
}

export default Sidebar;
