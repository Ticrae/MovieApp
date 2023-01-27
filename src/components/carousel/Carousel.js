import React, { useState, useEffect } from "react";
import { img_300 } from "../../config";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState();

  const fetchCredits = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const data = await res.json();
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container flex flex-wrap w-full h-[500px] overflow-auto gap-1">
      {credits?.map((c) => (
        <div className="text-center">
          <img
            width={"100px"}
            className="mb-3 rounded-[50%]"
            src={`${img_300}/${c.profile_path}`}
            alt={"profile"}
            onDragStart={handleDragStart}
          />
          <h6 className="text-[12px]">{c?.name}</h6>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
