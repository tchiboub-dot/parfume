"use client";

export function Starfield() {
  // Simple background layer with no animation to avoid clipping issues
  // The parallax effect will be handled at the CSS level for better performance and visibility
  return (
    <div 
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        willChange: "transform",
      }}
    >
      {/* Radial gradient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(214,171,73,0.08),transparent_40%),radial-gradient(circle_at_72%_10%,rgba(139,166,217,0.08),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(227,235,255,0.05),transparent_30%)]" />
      
      {/* Star layers - no overflow hidden */}
      <div className="absolute inset-0 stars-layer-1" />
      <div className="absolute inset-0 stars-layer-2" />
      <div className="absolute inset-0 stars-layer-3" />
      
      {/* Subtle base glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
