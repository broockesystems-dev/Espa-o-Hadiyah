import { ImageResponse } from "next/og";

export const alt = "Guia da Noiva — Cronograma da Noiva, por Malu Siqueira";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#104840", color: "#FAF8F5" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "58%" }}>
          <div style={{ fontSize: 18, letterSpacing: 6, color: "#C99B4B" }}>GUIA DA NOIVA</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "serif" }}>
            <div style={{ fontSize: 104, lineHeight: 0.95 }}>Cronograma</div>
            <div style={{ fontSize: 104, lineHeight: 0.95, fontStyle: "italic", color: "#F3E1DF" }}>da Noiva</div>
            <div style={{ fontSize: 30, marginTop: 32, fontStyle: "italic", opacity: 0.85 }}>Do primeiro passo ao grande dia</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 16, letterSpacing: 5 }}>
            <span>MALU SIQUEIRA</span>
            <span style={{ opacity: 0.55, marginTop: 8 }}>MAQUIADORA E PENTEADISTA</span>
          </div>
        </div>
        <div style={{ width: 2, background: "#C99B4B" }} />
        <div style={{ flex: 1, display: "flex", background: "#F3E1DF", alignItems: "flex-end", justifyContent: "center" }}>
          <div
            style={{
              width: 300,
              height: 470,
              borderTopLeftRadius: 150,
              borderTopRightRadius: 150,
              border: "2px solid #C99B4B",
              borderBottom: "none",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
