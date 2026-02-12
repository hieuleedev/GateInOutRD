import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    headline: "TỪ SỐ HÓA ĐẾN CHUYỂN ĐỔI SỐ",
    sub: "Chuyển dịch hoạt động doanh nghiệp lên môi trường số.",
  },
  {
    headline: "HỆ THỐNG QUẢN LÝ THÔNG MINH",
    sub: "Tối ưu hóa quy trình vận hành và kiểm soát dữ liệu tập trung.",
  },
  {
    headline: "KẾT NỐI – ĐỒNG BỘ – HIỆU QUẢ",
    sub: "Nền tảng số hóa toàn diện cho doanh nghiệp hiện đại.",
  },
];

const Login: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(username, password);
      navigate("/requests", { replace: true });
    } catch (err) {
      console.error("Login failed", err);
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap');

        .ll-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eef0f3;
          font-family: 'Be Vietnam Pro', sans-serif;
          padding: 20px 16px;
        }

        .ll-card {
          width: 100%;
          max-width: 1100px;
          min-height: 600px;
          display: flex;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 16px 56px rgba(0,0,0,0.16);
        }

        /* ── LEFT PANEL ── */
        .ll-left {
          display: none;
          position: relative;
          width: 56%;
          flex-shrink: 0;
          overflow: hidden;
        }
        @media (min-width: 860px) {
          .ll-left { display: block; }
          .ll-right { width: 44% !important; }
        }

        .ll-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .ll-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 44px 32px;
          z-index: 10;
          pointer-events: none;
        }

        .ll-center-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 22px;
          width: 100%;
        }

        .ll-logo img {
          height: 54px;
          object-fit: contain;
          filter: drop-shadow(0 2px 14px rgba(0,0,0,0.3));
          pointer-events: auto;
        }

        .ll-headline {
          font-family: 'Barlow', sans-serif;
          font-weight: 900;
          font-size: clamp(19px, 2vw, 26px);
          color: #fff;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
          line-height: 1.25;
        }

        .ll-sub {
          font-size: 13.5px;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
          text-shadow: 0 1px 8px rgba(0,0,0,0.35);
          margin-top: -8px;
        }

        .ll-controls {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          flex-shrink: 0;
          padding-bottom: 4px;
        }

        .ll-nav-btn {
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.4);
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          backdrop-filter: blur(6px);
        }
        .ll-nav-btn:hover { background: rgba(255,255,255,0.28); }

        .ll-dots {
          display: flex;
          gap: 9px;
          align-items: center;
        }
        .ll-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          border: none;
          padding: 0;
        }
        .ll-dot.active {
          background: #fff;
          transform: scale(1.25);
        }

        /* ── RIGHT PANEL ── */
        .ll-right {
          width: 100%;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 52px 56px;
        }

        .ll-field { margin-bottom: 22px; }

        .ll-label {
          display: block;
          font-size: 13.5px;
          font-weight: 500;
          color: #555;
          margin-bottom: 8px;
        }

        .ll-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #dde2e8;
          border-radius: 7px;
          font-size: 15px;
          font-family: 'Be Vietnam Pro', sans-serif;
          color: #1a1a2e;
          background: #f5f8fb;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          outline: none;
          box-sizing: border-box;
        }
        .ll-input:focus {
          border-color: #2196f3;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(33,150,243,0.1);
        }

        .ll-pw-wrap { position: relative; }
        .ll-pw-wrap .ll-input { padding-right: 46px; }
        .ll-pw-eye {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #aaa;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .ll-pw-eye:hover { color: #666; }

        .ll-error {
          font-size: 13px;
          color: #d32f2f;
          background: #fdecea;
          border-radius: 6px;
          padding: 8px 12px;
          margin-bottom: 12px;
        }

        .ll-btn-login {
          width: 100%;
          padding: 14px;
          background: #22c55e;
          color: #fff;
          font-family: 'Barlow', sans-serif;
          font-weight: 700;
          font-size: 17px;
          letter-spacing: 0.04em;
          border: none;
          border-radius: 7px;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
          box-shadow: 0 4px 16px rgba(34,197,94,0.32);
          margin-bottom: 18px;
        }
        .ll-btn-login:hover {
          background: #16a34a;
          box-shadow: 0 6px 22px rgba(34,197,94,0.42);
        }
        .ll-btn-login:active { transform: scale(0.98); }
        .ll-btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

        .ll-remember {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 12px;
        }
        .ll-remember input[type="checkbox"] {
          width: 15px;
          height: 15px;
          accent-color: #2196f3;
          cursor: pointer;
        }
        .ll-remember label {
          font-size: 13.5px;
          color: #777;
          cursor: pointer;
        }

        .ll-forgot {
          font-size: 13.5px;
          color: #1976d2;
          text-decoration: none;
          font-weight: 500;
        }
        .ll-forgot:hover { text-decoration: underline; }

        .ll-footer {
          margin-top: 44px;
          text-align: center;
          font-size: 12px;
          color: #bbb;
          line-height: 1.8;
        }
        .ll-footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }
        .ll-workit-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        }
        .ll-footer-brand span {
          font-size: 14px;
          font-weight: 700;
          color: #333;
        }
      `}</style>

      <div className="ll-root">
        <div className="ll-card">

          {/* ════ LEFT PANEL ════ */}
          <div className="ll-left">
            <svg
              className="ll-svg"
              viewBox="0 0 600 780"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/*
                Colors sampled from reference screenshot:
                - Right base: #c8d0d8  (cool light grey)
                - Outermost:  #4ac97e  (fresh mint green)
                - 2nd layer:  #3ab5d4  (sky / cyan blue)
                - 3rd layer:  #2872c0  (medium royal blue)
                - Innermost:  #1a4a9e  (deep blue)

                Slant: top-right point ~40px further right than bottom-right
              */}

              {/* Base grey */}
              <rect width="600" height="780" fill="#c8d0d8" />

              {/* Band 4 — mint green (outermost) */}
              <polygon points="0,0  510,0  470,780  0,780" fill="#4ac97e" />

              {/* Band 3 — sky/cyan blue */}
              <polygon points="0,0  378,0  340,780  0,780" fill="#38b8d8" />

              {/* Band 2 — royal blue */}
              <polygon points="0,0  254,0  220,780  0,780" fill="#2872c0" />

              {/* Band 1 — deep blue (innermost) */}
              <polygon points="0,0  142,0  114,780  0,780" fill="#1a4a9e" />
            </svg>

            <div className="ll-overlay">
              <div className="ll-center-block">
                <div className="ll-logo">
                  <img src="/LOGO THACO AUTO.png" alt="THACO AUTO" />
                </div>
                <div className="ll-headline">{slides[currentSlide].headline}</div>
                <div className="ll-sub">{slides[currentSlide].sub}</div>
              </div>

              <div className="ll-controls">
                <button className="ll-nav-btn" onClick={prevSlide} aria-label="Previous">
                  <ChevronLeft size={17} />
                </button>
                <div className="ll-dots">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`ll-dot${i === currentSlide ? " active" : ""}`}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button className="ll-nav-btn" onClick={nextSlide} aria-label="Next">
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* ════ RIGHT PANEL ════ */}
          <div className="ll-right">
            <form onSubmit={handleLogin}>

              <div className="ll-field">
                <label className="ll-label">Mã đăng nhập / User ID</label>
                <input
                  type="text"
                  className="ll-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập mã số nhân viên"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="ll-field">
                <label className="ll-label">Mật khẩu / Password</label>
                <div className="ll-pw-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="ll-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="ll-pw-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <div className="ll-error">{error}</div>}

              <button type="submit" className="ll-btn-login" disabled={isLoading}>
                {isLoading ? "Đang đăng nhập..." : "Login"}
              </button>

              <div className="ll-remember">
                <input
                  type="checkbox"
                  id="ll-remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="ll-remember">
                  Ghi nhớ Mã đăng nhập / Remember UserID
                </label>
              </div>

              <a href="#" className="ll-forgot">
                Quên mật khẩu / Forgot password
              </a>

            </form>

            <div className="ll-footer">
              <div>Developed by</div>
              <div className="ll-footer-brand">
                <div className="ll-workit-dot" />
                <span>Workit</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;