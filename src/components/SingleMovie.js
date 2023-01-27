import React from "react";
import { img_500 } from "../config";
import ContentModal from "./contentModal/ContentModal";

const SingleMovie = ({ id, poster, title, date, media_type, vote_average }) => {
  return (
    <ContentModal id={id} media_type={media_type}>
      <div
        key={id}
        className="p-4 text-[#fff] bg-[#161616] rounded-md flex flex-col items-center justify-center hover:-translate-y-1 hover:scale-110 transition ease-in-out hover:cursor-pointer"
      >
        <img width={"400px"} src={`${img_500}/${poster}`} alt="movie" />
        <h1 className="font-bold mt-6 text-[18px] text-center">{title}</h1>
      </div>
    </ContentModal>
  );
};

export default SingleMovie;
