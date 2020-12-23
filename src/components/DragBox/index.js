import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

export const DragBox = ({ data, index, raw }) => {
  const state = useSelector((state) => state?.postReducer);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
        dispatch({ type: "HOVER", value: hoverIndex });

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
        dispatch({ type: "HOVER", value: hoverIndex });

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { id: data?.id, type: "card" },
    collect: (monitor) => ({ isDragging: !!monitor?.isDragging() }),
  });
  drag(drop(ref));

  useEffect(() => {
    !isDragging && dispatch({ type: "HOVER", value: null });
  }, [isDragging]);

  return (
    <div
      ref={ref}
      style={{
        marginBottom: index === state?.hoverIndex ? "4rem" : "1rem ",
        padding: "1rem 1.2rem",
        border: "2px solid #fafafa",
        borderRadius: "5px",
        backgroundColor: "coral",
        userSelect: "none",
        cursor: "pointer",
        // boxShadow: isDragging
        //   ? "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
        //   : "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        display: isDragging ? "none" : "block",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      }}
    >
      <h5>{data?.name}</h5>
      <button
        style={{
          marginTop: "0.5rem",
          padding: "0.4rem 1rem",
          backgroundColor: "gold",
          border: 0,
          borderRadius: "2px",
        }}
        onClick={() =>
          dispatch({ type: raw ? "PROCESS" : "TORAW", value: data?.id })
        }
      >
        {raw ? "Process" : "Raw"}
      </button>
    </div>
  );
};
