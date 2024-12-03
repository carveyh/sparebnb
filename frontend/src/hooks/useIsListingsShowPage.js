import { useLocation } from "react-router-dom";

export default function useIsListingsShowPage() {
  return useLocation().pathname.startsWith('/listings');
};