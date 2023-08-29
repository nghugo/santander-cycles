import * as React from "react";

export function ClusterElement(props) {
  const [startX, setStartX] = React.useState(null);
  const [startY, setStartY] = React.useState(null);

  // separate mouse up vs down to distinguish between click vs drag
  const DELTA = 6;

  const handleMouseDown = (event) => {
    setStartX(event.pageX);
    setStartY(event.pageY);
  };

  const handleMouseUp = (event) => {
    const diffX = Math.abs(event.pageX - startX);
    const diffY = Math.abs(event.pageY - startY);
    if (diffX < DELTA && diffY < DELTA) {
      handleClick(event);
    }
  };
  const handleClick = (event) => {
    const expansionZoom = Math.min(
      props.supercluster.getClusterExpansionZoom(props.clusterid),
      20
    );
    props.mapref.current.setZoom(expansionZoom);
    props.mapref.current.panTo({ lat: props.lat, lng: props.lng });
  };

  return (
    <div
      {...props}
      style={{
        outline: "1px solid white",
        width: `${30 + (props.pointcount / props.pointslength) * 30}px`,
        height: `${30 + (props.pointcount / props.pointslength) * 30}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%",
        backgroundColor: "rgba(25,118,210, 0.9)",
        cursor: "pointer",
        zIndex: "1", // one level higher than regular elements
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {props.children}
    </div>
  );
}

export const ClusterText = (props) => {
  return (
    <p
      style={{
        margin: 0,
        color: "white",
        fontWeight: "500",
      }}
    >
      {props.children}
    </p>
  );
};
