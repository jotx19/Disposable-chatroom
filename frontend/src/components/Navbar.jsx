import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ArrowRight, Layers, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="font-custom text-white border rounded-2xl border-[#B3B2AD] fixed w-[calc(100%-1rem)] top-2 z-40 backdrop-blur-lg bg-base-100/80 mx-2">
      <div className="container mx-auto px-2 h-14">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">FlikChat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {authUser ? (
              <>
                <Link
                  to="/chatroom"
                  className="btn btn-sm flex items-center transition-colors"
                >
                  <Settings className="w-4 h-4 mr-2" />
                </Link>
              </>
            ) : (
              <Link
                to="/setting"
                className="btn btn-sm flex items-center transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
              </Link>
            )}

            {authUser ? (
              <>
                <Link to="/profile" className="btn btn-sm flex items-center">
                  <User className="size-5 mr-2" />
                </Link>

                <button
                  className="flex items-center p-1.5 border-white rounded-lg bg-white text-black hover:bg-[#ff91e7] hover:scale-105 border-transparent hover:border-white"
                  onClick={logout}
                >
                  <span>Logout</span>
                  <ArrowRight className="size-5 -rotate-45" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center p-1.5 border-white rounded-lg bg-white text-black hover:bg-[#ff91e7] hover:scale-105 border-transparent hover:border-white"
              >
                <span>Login</span>
                <ArrowRight className="size-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
