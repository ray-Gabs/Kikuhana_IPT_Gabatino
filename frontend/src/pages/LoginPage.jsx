import LoginPanel from '../components/Login/LoginPanel';
import logo from '../assets/Transparrent_Logo_Kikuhana.png';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#fff0f0] bg-fixed">
      
      {/* Logo behind everything */}
      <img
        src={logo}
        alt="Kikuhana Logo"
        className="absolute w-[1150px] max-w-[100vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none drop-shadow-xl"
      />

      {/* Login panel now includes parallax + sakura */}
      <LoginPanel />
    </div>
  );
}
