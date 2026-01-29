import React, { useMemo, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function QRLinkGenerator() {
  const [link, setLink] = useState<string>("http://rdthaco.io.vn/gate/");
  const qrRef = useRef<HTMLDivElement | null>(null);

  const valid = useMemo(() => isValidUrl(link.trim()), [link]);
  const value = valid ? link.trim() : "";

  const downloadPNG = async () => {
    if (!qrRef.current || !valid) return;

    // render div thành png
    const dataUrl = await toPng(qrRef.current, {
      cacheBust: true,
      pixelRatio: 3, // tăng chất lượng ảnh
      backgroundColor: "#ffffff",
    });

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <div className="mx-auto w-full max-w-xl p-4 sm:p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Tạo mã QR cho đường link
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Dán URL vào ô bên dưới, mã QR sẽ tự cập nhật.
            </p>
          </div>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
            QR Link
          </span>
        </div>

        <div className="mt-5 space-y-2">
          <label className="text-sm font-medium text-slate-800">Đường link</label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            className={[
              "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
              "placeholder:text-slate-400",
              valid
                ? "border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                : "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100",
            ].join(" ")}
          />
          {!valid && (
            <p className="text-xs text-rose-600">
              URL chưa hợp lệ (chỉ nhận http/https).
            </p>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* QR */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-800">Mã QR</p>
              <span
                className={[
                  "text-xs font-medium",
                  valid ? "text-emerald-600" : "text-rose-600",
                ].join(" ")}
              >
                {valid ? "Hợp lệ" : "Không hợp lệ"}
              </span>
            </div>

            {/* vùng sẽ convert sang PNG */}
            <div
              ref={qrRef}
              className="mt-3 flex items-center justify-center rounded-xl bg-white p-4"
            >
              <QRCode value={value} size={220} />
            </div>

            <p className="mt-3 break-all text-xs text-slate-500">
              {valid ? value : "Nhập URL hợp lệ để tạo QR"}
            </p>
          </div>

          {/* Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-medium text-slate-800">Hành động</p>
            <p className="mt-1 text-xs text-slate-600">
              Tải QR dạng PNG (nền trắng, chất lượng cao).
            </p>

            <button
              onClick={downloadPNG}
              disabled={!valid}
              className={[
                "mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition",
                valid
                  ? "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950"
                  : "cursor-not-allowed bg-slate-200 text-slate-500",
              ].join(" ")}
            >
              Tải QR (.png)
            </button>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-700">Gợi ý</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-slate-600">
                <li>Ảnh PNG sẽ nét hơn khi <b>pixelRatio</b> cao</li>
                <li>QR nên tối thiểu 200x200</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Tip: Dùng Next.js thì nhớ đặt component trong client component.
      </p>
    </div>
  );
}
