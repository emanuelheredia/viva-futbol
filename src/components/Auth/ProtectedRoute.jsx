import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (!auth.login) navigate("/login");
	}, [auth]);
	return <>{children}</>;
};
