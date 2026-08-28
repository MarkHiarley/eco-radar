"use client";
import { useEffect } from "react";

// Widget oficial do VLibras (gov.br) — injeta o script uma única vez.
// Troca o pacote @djpfs/react-vlibras, que quebra o bundler do Next 16.
export default function VLibrasWidget() {
  useEffect(() => {
    if (document.getElementById("vlibras-script")) return;
    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div {...{ vw: true }} className="enabled" aria-hidden>
      <div vw-access-button className="active" />
      <div vw-plugin-wrapper>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}