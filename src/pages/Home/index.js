import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getAllPosts } from "../../store/actions";
import { useDrag, useDrop } from "react-dnd";
import { DragBox } from "../../components/DragBox";

const HomePage = () => {
  const state = useSelector((state) => state?.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "4rem" }}>
      <DropArea data={state?.raw} raw />
      <DropArea data={state?.processed} processed />
    </div>
  );
};

const DropArea = ({ data, raw }) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (item, monitor) =>
      dispatch({ type: raw ? "TORAW" : "PROCESS", value: item?.id }),
    collect: (monitor) => ({ isOver: !!monitor?.isOver() }),
  });

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: "darkcyan",
        padding: "1rem",
        flex: 1,
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      }}
    >
      {data?.map((item, index) => (
        <DragBox key={item?.id} data={item} index={index} raw={raw} />
      ))}
    </div>
  );
};

export default HomePage;
