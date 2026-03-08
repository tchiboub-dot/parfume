"use client";

export function Starfield() {
  // Starfield is now rendered as part of normal document flow
  // This ensures it scales to full document height, not just viewport
  // Stars are positioned absolutely within a full-height container
  return (
    <div 
      className="pointer-events-none absolute inset-0 top-0 left-0 right-0 -z-10"
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Radial gradient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(214,171,73,0.08),transparent_40%),radial-gradient(circle_at_72%_10%,rgba(139,166,217,0.08),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(227,235,255,0.05),transparent_30%)]" />
      
      {/* Star layers - tiled across full height */}
      <div className="absolute inset-0 stars-layer-1" style={{ backgroundAttachment: "fixed" }} />
      <div className="absolute inset-0 stars-layer-2" style={{ backgroundAttachment: "fixed" }} />
      <div className="absolute inset-0 stars-layer-3" style={{ backgroundAttachment: "fixed" }} />
      
      {/* Subtle base glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
