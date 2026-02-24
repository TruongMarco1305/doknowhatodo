import type { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>();