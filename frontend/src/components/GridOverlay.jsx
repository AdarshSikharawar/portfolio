import ShapeGrid from './ShapeGrid';

/**
 * Full-page fixed grid overlay using the ReactBits ShapeGrid.
 * Config: direction=down, speed=0.43, square shape, golden hover fill.
 */
const GridOverlay = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      // allow mouse events through to canvas so hover effect works,
      // but keep below all page content via z-index
      pointerEvents: 'none',
    }}
  >
    <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
      <ShapeGrid
        direction="down"
        speed={0.43}
        borderColor="rgba(255,255,255,0.07)"
        squareSize={60}
        hoverFillColor="rgba(212,175,55,0.12)"
        shape="square"
        hoverTrailAmount={4}
      />
    </div>
  </div>
);

export default GridOverlay;
