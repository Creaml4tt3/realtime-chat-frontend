import { PopupCenter } from "./PopupCenter";

export default function GoogleSignin({ close }: any) {
  const handleSignIn = () => {
    PopupCenter("/auth/login/google", "Google Signin");
  };

  return (
    <section className="google-modal-container flex-center fixed left-0 top-0 z-50 h-screen w-screen bg-transparent">
      {/* <div className="google-modal-overlay pointer-events-none fixed left-0 top-0 z-40 h-full w-full bg-softwhite opacity-60 shadow-inner" /> */}
      <div className="google-modal z-50 rounded-24px bg-softwhite px-6 py-4 shadow-xl">
        <div className="google-modal-content flex-center flex-col">
          <div className="google-modal-header">
            {/* <div className="google-modal-title">
              <span>Sign in with Google</span>
            </div> */}
            <button
              className="google-modal-button-text"
              onClick={() => close()}
            >
              close
            </button>
          </div>
          <div className="google-modal-body">
            {/* <div className="google-modal-text">
              <span>Sign in with Google</span>
            </div> */}
          </div>
          <div className="google-modal-footer">
            <div className="google-modal-button">
              <button
                className="google-modal-button-text"
                onClick={() => handleSignIn()}
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
