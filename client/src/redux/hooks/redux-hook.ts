import { AppDispatch, AppRootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<AppRootState>();

export { useAppDispatch, useAppSelector };
