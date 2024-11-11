import { useCookies } from "react-cookie";

export function withAuth(Component: React.ComponentType): React.FC {
  return function WithAuth(props) {
    const [cookie] = useCookies();
    if (!cookie["accessToken"]) {
      throw new Error("Cookie not found");
    }

    return <Component {...props} />;
  };
}
